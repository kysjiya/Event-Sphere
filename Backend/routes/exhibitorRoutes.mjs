import express from 'express';
import {
  registerExhibitor,
  getMyExhibitorProfile,
  updateExhibitorProfile,
  getAllExhibitors,
  approveExhibitor
} from '../controllers/exhibitorController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';
import { authorizeRoles } from '../middlewares/roleMiddleware.mjs';

const router = express.Router();

// Exhibitor actions
router.post('/', protect, authorizeRoles('exhibitor'), registerExhibitor);
router.get('/me', protect, authorizeRoles('exhibitor'), getMyExhibitorProfile);
router.put('/me', protect, authorizeRoles('exhibitor'), updateExhibitorProfile);

// Admin/Organizer actions
router.get('/all/:expoId', protect, authorizeRoles('admin', 'organizer'), getAllExhibitors);
router.put('/approve/:id', protect, authorizeRoles('admin', 'organizer'), approveExhibitor);

export default router;
