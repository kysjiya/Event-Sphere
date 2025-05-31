import express from 'express';
import {
  getNotifications,
  markAsRead,
  createNotification,
} from '../controllers/notificationController.mjs';

import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();


router.get('/', protect, getNotifications);
router.put('/:notificationId/read', protect,  markAsRead);

// Admin or server can create notification for any user (you can add roleMiddleware here if needed)
router.post('/', protect, createNotification);

export default router;
