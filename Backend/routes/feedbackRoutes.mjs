import express from 'express';
import {
  submitFeedback,
  getAllFeedback,
  updateFeedbackStatus,
} from '../controllers/feedbackController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';
import { authorizeRoles } from '../middlewares/roleMiddleware.mjs';

const router = express.Router();


// Any logged-in user can submit feedback
router.post('/', submitFeedback);

// Only admin/organizer can view and update feedback
router.get('/', protect, authorizeRoles(['admin', 'organizer']), getAllFeedback);
router.put('/:feedbackId/status',protect,  authorizeRoles(['admin', 'organizer']), updateFeedbackStatus);

export default router;
