import { Router } from 'express';
import { chatbot, recommendVolunteers, volunteerInsights } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

export const aiRouter = Router();

aiRouter.post('/recommend-volunteers', protect, recommendVolunteers);
aiRouter.post('/chatbot', protect, chatbot);
aiRouter.post('/insights', protect, volunteerInsights);
