import express from 'express'; // Import express
import apiRoutes from './api/index.js';
import authRoutes from './auth-routes.js';
// import { serviceRouter } from '../routes/api/service-routes.ts'; // Uncomment if needed
import { authenticateToken } from '../middleware/auth.js';
import { partRoute } from './api/parts-routes.js';

const router = express.Router(); // Use express.Router(), not Express.router()

// Uncomment the line below if you plan to use the 'service' route
// router.use('/service', serviceRouter); 

// Define your routes here
router.use('/parts', partRoute);
router.use('/auth', authRoutes);

// Secure '/api' route with the authenticateToken middleware
router.use('/api', apiRoutes, authenticateToken);

export default router;

