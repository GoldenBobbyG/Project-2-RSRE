import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js';
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
 
const router = Router();

router.use('/auth', authRoutes)

router.use('/api', apiRoutes, authenticateToken);


export default router;
