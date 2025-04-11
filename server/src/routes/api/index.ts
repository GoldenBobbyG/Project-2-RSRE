import { Router } from 'express';
import { partRoute } from './parts-routes.js';  // Correct import now
import { userRoute } from './user-routes.js';  // Removed unnecessary .js extension

const router = Router();

router.use('/parts', partRoute);
router.use('/users', userRoute);

export default router;