/**
 * Unit tests for auth middleware (src/middleware/auth.mjs)
 *
 * These tests verify that the JWT authentication middleware works correctly
 * with Express 4, which is used after the express downgrade in this PR.
 */
import jwt from 'jsonwebtoken';
import auth from '../../src/middleware/auth.mjs';

const TEST_SECRET = 'test-secret';

const makeReqResNext = (headers = {}) => {
  const req = { header: (name) => headers[name] };
  const res = {
    _status: null,
    _body: null,
    status(code) {
      this._status = code;
      return this;
    },
    json(body) {
      this._body = body;
      return this;
    },
  };
  const next = jest.fn();
  return { req, res, next };
};

describe('auth middleware', () => {
  const originalEnv = process.env.JWT_SECRET;

  beforeEach(() => {
    process.env.JWT_SECRET = TEST_SECRET;
  });

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalEnv;
    }
  });

  describe('when no Authorization header is provided', () => {
    it('responds with 401 and a relevant message', () => {
      const { req, res, next } = makeReqResNext();
      auth(req, res, next);
      expect(res._status).toBe(401);
      expect(res._body).toMatchObject({ message: 'No token, authorization denied' });
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('when Authorization header is present but does not start with "Bearer "', () => {
    it('responds with 401 for a plain token', () => {
      const { req, res, next } = makeReqResNext({ Authorization: 'plain-token' });
      auth(req, res, next);
      expect(res._status).toBe(401);
      expect(res._body).toMatchObject({ message: 'No token, authorization denied' });
      expect(next).not.toHaveBeenCalled();
    });

    it('responds with 401 for Basic auth scheme', () => {
      const { req, res, next } = makeReqResNext({ Authorization: 'Basic dXNlcjpwYXNz' });
      auth(req, res, next);
      expect(res._status).toBe(401);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('when a Bearer token is provided', () => {
    it('calls next() and attaches user to request for a valid token', () => {
      const payload = { id: 'user123', role: 'user' };
      const token = jwt.sign(payload, TEST_SECRET, { expiresIn: '1h' });
      const { req, res, next } = makeReqResNext({ Authorization: `Bearer ${token}` });

      auth(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.user).toEqual({ id: 'user123', role: 'user' });
    });

    it('calls next() and attaches admin user role correctly', () => {
      const payload = { id: 'admin456', role: 'admin' };
      const token = jwt.sign(payload, TEST_SECRET, { expiresIn: '1h' });
      const { req, res, next } = makeReqResNext({ Authorization: `Bearer ${token}` });

      auth(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.user).toEqual({ id: 'admin456', role: 'admin' });
    });

    it('responds with 401 for an expired token', () => {
      const payload = { id: 'user123', role: 'user' };
      const token = jwt.sign(payload, TEST_SECRET, { expiresIn: '0s' });
      const { req, res, next } = makeReqResNext({ Authorization: `Bearer ${token}` });

      auth(req, res, next);

      expect(res._status).toBe(401);
      expect(res._body).toMatchObject({ message: 'Token is not valid' });
      expect(next).not.toHaveBeenCalled();
    });

    it('responds with 401 for a token signed with a different secret', () => {
      const payload = { id: 'user123', role: 'user' };
      const token = jwt.sign(payload, 'wrong-secret', { expiresIn: '1h' });
      const { req, res, next } = makeReqResNext({ Authorization: `Bearer ${token}` });

      auth(req, res, next);

      expect(res._status).toBe(401);
      expect(res._body).toMatchObject({ message: 'Token is not valid' });
      expect(next).not.toHaveBeenCalled();
    });

    it('responds with 401 for a malformed (non-JWT) token string', () => {
      const { req, res, next } = makeReqResNext({ Authorization: 'Bearer not-a-real-jwt' });

      auth(req, res, next);

      expect(res._status).toBe(401);
      expect(res._body).toMatchObject({ message: 'Token is not valid' });
      expect(next).not.toHaveBeenCalled();
    });

    it('responds with 401 for an empty Bearer token (Bearer only)', () => {
      // "Bearer " prefix present but token part is empty string
      const { req, res, next } = makeReqResNext({ Authorization: 'Bearer ' });

      auth(req, res, next);

      // substring(7) gives "" which is falsy → caught by !token branch
      expect(res._status).toBe(401);
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('fallback JWT secret', () => {
    it('uses the default secret when JWT_SECRET env var is not set', () => {
      delete process.env.JWT_SECRET;
      const defaultSecret = 'your-secret-key';
      const payload = { id: 'user789', role: 'user' };
      const token = jwt.sign(payload, defaultSecret, { expiresIn: '1h' });
      const { req, res, next } = makeReqResNext({ Authorization: `Bearer ${token}` });

      auth(req, res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(req.user).toEqual({ id: 'user789', role: 'user' });
    });
  });
});