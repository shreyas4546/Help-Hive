import { Router } from 'express';
import {
  getEventParticipation,
  getLeaderboard,
  getResourceUsage,
} from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

export const analyticsRouter = Router();

analyticsRouter.get('/resource-usage', protect, getResourceUsage);
analyticsRouter.get('/event-participation', protect, getEventParticipation);
analyticsRouter.get('/leaderboard', protect, getLeaderboard);
