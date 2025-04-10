import { Router } from 'express';
import partRoute from '../api/parts-routes';
import { userRoute } from './user-routes.js';
import {}

const router = Router();

router.use('/parts', partRoute);
router.use('/users', userRoute);

export default router;