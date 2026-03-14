import { Router } from 'express';
import { getOverview, getVolunteerDashboard } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

export const dashboardRouter = Router();

dashboardRouter.get('/overview', protect, getOverview);
dashboardRouter.get('/volunteer', protect, getVolunteerDashboard);
