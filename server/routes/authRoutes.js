import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

export const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', protect, me);
