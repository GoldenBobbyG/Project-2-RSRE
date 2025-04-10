import { Router } from 'express';
import partRoute from '../api/parts-routes';
import { userRoute } from './user-routes.js';
import employeeRoute from './employee-routes.js';

const router = Router();

router.use('/parts', partRoute);
router.use('/users', userRoute);
router.use('/employees', employeeRoute); // Add this if employeeRoute is used

export default router;