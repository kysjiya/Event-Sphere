import express from 'express';
import { createSchedule, getAllSchedules, updateSchedule, deleteSchedule } from '../controllers/scheduleController.mjs';

const router = express.Router();

router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);

export default router;
