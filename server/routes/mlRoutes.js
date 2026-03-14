import { Router } from 'express';
import { predictResources } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

export const mlRouter = Router();

mlRouter.post('/predict-resources', protect, predictResources);
