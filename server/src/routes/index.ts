import express from 'express';
import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js';
import { authenticateToken } from '../middleware/auth.js';
import { partRoute } from './api/parts-routes.js';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({ message: 'Welcome to the API!' });
  });

// Route for parts
router.use('/parts', partRoute);

// Route for authentication
router.use('/auth', authRoutes);

// Secure '/api' route with authenticateToken middleware
router.use('/api', authenticateToken, apiRoutes);

export default router;