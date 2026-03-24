import express from 'express';
import User from '../models/userModel.mjs';
import auth from '../middleware/auth.mjs';

const route = express.Router();

route.get('/', auth, async (request, response) => {
  try {
    if (request.user.role !== 'admin') {
      return response.status(403).json({ message: 'Access denied' });
    }
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    response.json({ users, total: users.length });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
});

route.get('/:id', auth, async (request, response) => {
  try {
    const user = await User.findById(request.params.id).select('-password');
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.json(user);
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
});

route.delete('/:id', auth, async (request, response) => {
  try {
    if (request.user.role !== 'admin') {
      return response.status(403).json({ message: 'Access denied' });
    }
    const user = await User.findByIdAndDelete(request.params.id);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.json({ message: 'User deleted successfully' });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
});

export default route;
