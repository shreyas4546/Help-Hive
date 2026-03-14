import { Router } from 'express';
import {
  assignVolunteers,
  createEvent,
  deleteEvent,
  getEvents,
  joinEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';

export const eventRouter = Router();

eventRouter.get('/', protect, getEvents);
eventRouter.post('/', protect, createEvent);
eventRouter.delete('/:id', protect, deleteEvent);
eventRouter.post('/:id/join', protect, joinEvent);
eventRouter.post('/join', protect, joinEvent);
eventRouter.post('/:id/assign-volunteers', protect, assignVolunteers);
