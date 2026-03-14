import { Router } from 'express';
import {
  getActivity,
  getCertificate,
  getDisasters,
  getHelpRequests,
  getImpact,
  getMapData,
  getNotifications,
  getProfile,
  getTasks,
  respondToHelpRequest,
  updateProfile,
} from '../controllers/volunteerExperienceController.js';
import { getVolunteerDashboard } from '../controllers/dashboardController.js';
import { getLeaderboard } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

export const volunteerExperienceRouter = Router();

volunteerExperienceRouter.get('/activity', protect, getActivity);
volunteerExperienceRouter.get('/volunteer-activity', protect, getActivity);
volunteerExperienceRouter.get('/help-requests', protect, getHelpRequests);
volunteerExperienceRouter.post('/help-requests/:id/respond', protect, respondToHelpRequest);
volunteerExperienceRouter.get('/notifications', protect, getNotifications);
volunteerExperienceRouter.get('/map-data', protect, getMapData);
volunteerExperienceRouter.get('/impact', protect, getImpact);
volunteerExperienceRouter.get('/profile/:userId', protect, getProfile);
volunteerExperienceRouter.put('/profile/:userId', protect, updateProfile);
volunteerExperienceRouter.get('/certificates/:userId', protect, getCertificate);
volunteerExperienceRouter.get('/disaster', protect, getDisasters);
volunteerExperienceRouter.get('/tasks', protect, getTasks);
volunteerExperienceRouter.get('/leaderboard', protect, getLeaderboard);
volunteerExperienceRouter.get('/volunteer/dashboard', protect, getVolunteerDashboard);
