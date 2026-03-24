import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';

const generateToken = (id, role) => {
  const payload = { id, role };
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  const options = { expiresIn: '24h' };
  return jwt.sign(payload, secret, options);
};

export const register = async (request, response) => {
  try {
    const { username, email, password, role } = request.body;

    if (!username || !email || !password) {
      return response.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return response.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ username, email, password, role: role || 'user' });
    await user.save();

    const token = generateToken(user._id, user.role);

    response.status(201).json({
      message: 'User registered successfully',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    response.status(500).json({ message: 'Server error' });
  }
};

export const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return response.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    response.json({
      message: 'Login successful',
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    response.status(500).json({ message: 'Server error' });
  }
};

export const getMe = async (request, response) => {
  try {
    const user = await User.findById(request.user.id).select('-password');
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (request, response) => {
  response.json({ message: 'Logged out successfully' });
};
