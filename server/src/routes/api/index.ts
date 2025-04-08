import { Router } from 'express';
import { partRoute } from './parts-routes.js';
import { userRoute } from './user-routes.js';

const router = Router();

router.use('/parts', partRoute);
router.use('/users', userRoute);

export default router;