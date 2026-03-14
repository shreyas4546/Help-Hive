import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import { aiRouter } from './routes/aiRoutes.js';
import { volunteerInsights } from './controllers/aiController.js';
import { analyticsRouter } from './routes/analyticsRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { dashboardRouter } from './routes/dashboardRoutes.js';
import { eventRouter } from './routes/eventRoutes.js';
import { mlRouter } from './routes/mlRoutes.js';
import { resourceRouter } from './routes/resourceRoutes.js';
import { volunteerExperienceRouter } from './routes/volunteerExperienceRoutes.js';
import { volunteerRouter } from './routes/volunteerRoutes.js';
import { protect } from './middleware/authMiddleware.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(
  cors({
    origin: process.env.CLIENT_URL?.split(',') || '*',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'HelpHive API' });
});

app.use('/api/auth', authRouter);
app.use('/api/volunteers', volunteerRouter);
app.use('/api/events', eventRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/ai', aiRouter);
app.use('/api/ml', mlRouter);
app.use('/api', volunteerExperienceRouter);
app.post('/api/ai-insights', protect, volunteerInsights);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`HelpHive API running on port ${port}`);
});
