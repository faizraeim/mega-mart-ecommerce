import express from 'express';
import { register, login, getMe, logout } from '../controller/authController.mjs';
import auth from '../middleware/auth.mjs';

const route = express.Router();

route.post('/register', register);
route.post('/login', login);
route.post('/logout', auth, logout);
route.get('/me', auth, getMe);

export default route;
