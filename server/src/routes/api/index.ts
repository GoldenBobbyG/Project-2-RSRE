import { Router } from 'express';
import { partRoute } from './parts-routes.js';  // Correct import now
import { userRoute } from './user-routes.js';  // Removed unnecessary .js extension
import { employeeRoute } from './employee-routes.js';
const router = Router();

router.use('/parts', partRoute);
router.use('/users', userRoute);
router.use('/employee', employeeRoute);
export default router;
