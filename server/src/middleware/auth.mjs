import jwt from 'jsonwebtoken';

const auth = (request, response, next) => {
  const authHeader = request.header('Authorization');
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  }

  if (!token) {
    return response.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret);
    request.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    response.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;
