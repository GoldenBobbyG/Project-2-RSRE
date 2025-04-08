import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js';
import { serviceRouter } from '../routes/api/service-routes.ts';
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { partRoute } from './api/parts-routes.js';
 
const router = express.Router();

router.use ('/service', serviceRouter);
router.use ('/parts', partRoute)
router.use('/auth', authRoutes)

router.use('/api', apiRoutes, authenticateToken);


export default router;
