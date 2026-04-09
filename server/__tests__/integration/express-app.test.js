/**
 * Integration tests verifying Express 4 compatibility after the express
 * downgrade from v5 to v4 in this PR.
 *
 * These tests create a minimal Express 4 application that mirrors the
 * structure of the production app (server.mjs) without requiring a live
 * MongoDB connection. HTTP requests are made over Unix domain sockets to
 * avoid TCP restrictions in the test environment.
 */
import http from 'http';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import auth from '../../src/middleware/auth.mjs';

const TEST_SECRET = 'integration-test-secret';

let socketPath;
let server;

function makeRequest(method, path, body, headers) {
  headers = headers || {};
  return new Promise(function(resolve, reject) {
    var bodyStr = body ? JSON.stringify(body) : null;
    var opts = {
      socketPath: socketPath,
      path: path,
      method: method.toUpperCase(),
      headers: Object.assign(
        {},
        bodyStr ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(bodyStr)
        } : {},
        headers
      )
    };
    var req = http.request(opts, function(res) {
      var data = '';
      res.on('data', function(chunk) { data += chunk; });
      res.on('end', function() {
        var parsed;
        try { parsed = JSON.parse(data); } catch(e) { parsed = data; }
        resolve({ status: res.statusCode, body: parsed, headers: res.headers });
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function buildApp() {
  var app = express();

  app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
  app.use(express.json());

  app.get('/', function(req, res) { res.status(200).send('Welcome to MegaMart Server'); });

  var authRouter = express.Router();

  authRouter.post('/register', function(req, res) {
    var body = req.body || {};
    var username = body.username;
    var email = body.email;
    var password = body.password;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    var token = jwt.sign({ id: 'mock-id', role: 'user' }, TEST_SECRET, { expiresIn: '24h' });
    res.status(201).json({
      message: 'User registered successfully',
      user: { id: 'mock-id', username: username, email: email, role: 'user' },
      token: token
    });
  });

  authRouter.post('/login', function(req, res) {
    var body = req.body || {};
    var email = body.email;
    var password = body.password;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (email !== 'test@example.com' || password !== 'correct') {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    var token = jwt.sign({ id: 'user-1', role: 'user' }, TEST_SECRET, { expiresIn: '24h' });
    res.json({
      message: 'Login successful',
      user: { id: 'user-1', username: 'testuser', email: email, role: 'user' },
      token: token
    });
  });

  authRouter.post('/logout', auth, function(req, res) {
    res.json({ message: 'Logged out successfully' });
  });

  authRouter.get('/me', auth, function(req, res) {
    res.json({ id: req.user.id, role: req.user.role });
  });

  var productRouter = express.Router();

  productRouter.get('/products', function(req, res) {
    res.json({ products: [], total: 0 });
  });

  productRouter.get('/products/filter', function(req, res) {
    var field = req.query.field;
    var value = req.query.value;
    if (!field || !value) return res.status(400).json({ message: 'field and value are required' });
    res.json({ products: [], total: 0 });
  });

  productRouter.get('/product/:id', function(req, res) {
    var id = parseInt(req.params.id, 10);
    if (isNaN(id)) return res.status(400).json({ message: 'Bad Request. Invalid ID' });
    res.status(404).json({ message: 'Not found' });
  });

  productRouter.post('/product', function(req, res) {
    var body = req.body || {};
    if (!body.title) return res.status(400).json({ message: 'title is required' });
    res.status(201).json({ message: 'Created', product: body });
  });

  productRouter.put('/update/product/:id', function(req, res) { res.json({ message: 'Updated' }); });
  productRouter.patch('/update/product/:id', function(req, res) { res.json({ message: 'Patched' }); });
  productRouter.delete('/delete/product/:id', function(req, res) { res.json({ message: 'Deleted' }); });

  app.use('/api', productRouter);
  app.use('/api/auth', authRouter);

  return app;
}

beforeAll(function(done) {
  process.env.JWT_SECRET = TEST_SECRET;
  socketPath = '/tmp/jest-express-' + process.pid + '-' + new Date().getTime() + '.sock';
  try { fs.unlinkSync(socketPath); } catch(e) { /* ignore */ }
  server = http.createServer(buildApp());
  server.listen(socketPath, done);
});

afterAll(function(done) {
  delete process.env.JWT_SECRET;
  server.close(function() {
    try { fs.unlinkSync(socketPath); } catch(e) { /* ignore */ }
    done();
  });
});

describe('Express 4 app — root and core middleware', function() {
  it('GET / returns 200 with welcome message', async function() {
    var res = await makeRequest('GET', '/');
    expect(res.status).toBe(200);
    expect(res.body).toBe('Welcome to MegaMart Server');
  });

  it('returns 404 for unknown routes', async function() {
    var res = await makeRequest('GET', '/does-not-exist');
    expect(res.status).toBe(404);
  });

  it('parses JSON request body via express.json()', async function() {
    var res = await makeRequest('POST', '/api/product', { title: 'Test Product' });
    expect(res.status).toBe(201);
    expect(res.body.product.title).toBe('Test Product');
  });

  it('rejects missing body fields after JSON parsing', async function() {
    var res = await makeRequest('POST', '/api/product', { price: 9.99 });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('title is required');
  });

  it('includes Access-Control-Allow-Origin CORS header in responses', async function() {
    var res = await makeRequest('GET', '/', null, { Origin: 'http://localhost:5173' });
    expect(res.headers['access-control-allow-origin']).toBe('http://localhost:5173');
  });
});

describe('Express 4 app — auth routes', function() {
  describe('POST /api/auth/register', function() {
    it('returns 201 with token when all fields supplied', async function() {
      var res = await makeRequest('POST', '/api/auth/register', {
        username: 'alice',
        email: 'alice@example.com',
        password: 'secret123'
      });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('token');
      expect(res.body.message).toBe('User registered successfully');
    });

    it('returns 400 when username is missing', async function() {
      var res = await makeRequest('POST', '/api/auth/register', {
        email: 'alice@example.com',
        password: 'secret123'
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('All fields are required');
    });

    it('returns 400 when email is missing', async function() {
      var res = await makeRequest('POST', '/api/auth/register', {
        username: 'alice',
        password: 'secret123'
      });
      expect(res.status).toBe(400);
    });

    it('returns 400 when password is missing', async function() {
      var res = await makeRequest('POST', '/api/auth/register', {
        username: 'alice',
        email: 'alice@example.com'
      });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', function() {
    it('returns 200 with token on valid credentials', async function() {
      var res = await makeRequest('POST', '/api/auth/login', {
        email: 'test@example.com',
        password: 'correct'
      });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body.message).toBe('Login successful');
    });

    it('returns 401 on wrong password', async function() {
      var res = await makeRequest('POST', '/api/auth/login', {
        email: 'test@example.com',
        password: 'wrong'
      });
      expect(res.status).toBe(401);
    });

    it('returns 400 when email is missing', async function() {
      var res = await makeRequest('POST', '/api/auth/login', { password: 'correct' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when password is missing', async function() {
      var res = await makeRequest('POST', '/api/auth/login', { email: 'test@example.com' });
      expect(res.status).toBe(400);
    });
  });

  describe('POST /api/auth/logout (requires auth)', function() {
    it('returns 200 with a valid JWT token', async function() {
      var token = jwt.sign({ id: 'u1', role: 'user' }, TEST_SECRET, { expiresIn: '1h' });
      var res = await makeRequest('POST', '/api/auth/logout', null, {
        Authorization: 'Bearer ' + token
      });
      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Logged out successfully');
    });

    it('returns 401 without a token', async function() {
      var res = await makeRequest('POST', '/api/auth/logout');
      expect(res.status).toBe(401);
    });

    it('returns 401 with an expired token', async function() {
      var token = jwt.sign({ id: 'u1', role: 'user' }, TEST_SECRET, { expiresIn: '0s' });
      var res = await makeRequest('POST', '/api/auth/logout', null, {
        Authorization: 'Bearer ' + token
      });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /api/auth/me (requires auth)', function() {
    it('returns user info with a valid token', async function() {
      var token = jwt.sign({ id: 'u1', role: 'admin' }, TEST_SECRET, { expiresIn: '1h' });
      var res = await makeRequest('GET', '/api/auth/me', null, {
        Authorization: 'Bearer ' + token
      });
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ id: 'u1', role: 'admin' });
    });

    it('returns 401 without a token', async function() {
      var res = await makeRequest('GET', '/api/auth/me');
      expect(res.status).toBe(401);
    });
  });
});

describe('Express 4 app — product routes', function() {
  it('GET /api/products returns 200 with products array', async function() {
    var res = await makeRequest('GET', '/api/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.products)).toBe(true);
  });

  it('GET /api/products/filter returns 200 with valid params', async function() {
    var res = await makeRequest('GET', '/api/products/filter?field=category&value=phones');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('products');
  });

  it('GET /api/products/filter returns 400 when params are missing', async function() {
    var res = await makeRequest('GET', '/api/products/filter');
    expect(res.status).toBe(400);
  });

  it('GET /api/products/filter returns 400 when only one param is provided', async function() {
    var res = await makeRequest('GET', '/api/products/filter?field=category');
    expect(res.status).toBe(400);
  });

  it('GET /api/product/:id returns 404 for valid numeric id not found', async function() {
    var res = await makeRequest('GET', '/api/product/999');
    expect(res.status).toBe(404);
  });

  it('GET /api/product/:id returns 400 for non-numeric id', async function() {
    var res = await makeRequest('GET', '/api/product/abc');
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Invalid ID/i);
  });

  it('POST /api/product returns 201 when title is provided', async function() {
    var res = await makeRequest('POST', '/api/product', { title: 'New Item', price: 9.99 });
    expect(res.status).toBe(201);
    expect(res.body.product.title).toBe('New Item');
  });

  it('POST /api/product returns 400 when title is missing', async function() {
    var res = await makeRequest('POST', '/api/product', { price: 9.99 });
    expect(res.status).toBe(400);
  });

  it('PUT /api/update/product/:id returns 200', async function() {
    var res = await makeRequest('PUT', '/api/update/product/123', { title: 'Updated' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Updated');
  });

  it('PATCH /api/update/product/:id returns 200', async function() {
    var res = await makeRequest('PATCH', '/api/update/product/123', { price: 5.99 });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Patched');
  });

  it('DELETE /api/delete/product/:id returns 200', async function() {
    var res = await makeRequest('DELETE', '/api/delete/product/123');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Deleted');
  });
});

describe('Express 4 Router — route ordering regression', function() {
  it('/api/products/filter is handled by the filter route (not /product/:id)', async function() {
    var res = await makeRequest('GET', '/api/products/filter');
    expect(res.body.message).toBe('field and value are required');
  });

  it('numeric :id in /api/product/:id is parsed correctly', async function() {
    var res = await makeRequest('GET', '/api/product/42');
    expect(res.status).toBe(404);
  });

  it('boundary id value 0 is treated as found-or-not-found (not invalid) by Express 4 params', async function() {
    var res = await makeRequest('GET', '/api/product/0');
    expect(res.status).toBe(404);
  });
});