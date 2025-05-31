import express from 'express';
import { getAnalyticsByExpo, updateAnalytics } from '../controllers/analyticsController.mjs';

const router = express.Router();

router.get('/:expoId', getAnalyticsByExpo);
router.post('/update', updateAnalytics);

export default router;
