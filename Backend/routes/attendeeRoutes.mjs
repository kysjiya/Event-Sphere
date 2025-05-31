import express from 'express';
import { getAttendeeProfile, registerForExpo, registerForSession } from '../controllers/attendeeController.mjs';

const router = express.Router();

router.get('/:id', getAttendeeProfile);
router.post('/:id/register-expo', registerForExpo);
router.post('/:id/register-session', registerForSession);

export default router;
