import express from "express";
import {
  getAllExhibitorProfiles,
  getExhibitorProfile,
  createOrUpdateExhibitorProfile,
  deleteExhibitorProfile
} from "../controllers/exhibitorProfileController.mjs";
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// ✅ FIXED: route to get all exhibitor profiles
router.get('/all', protect, getAllExhibitorProfiles);

// Other routes
router.get('/profile', protect, getExhibitorProfile);
router.post('/profile', protect, createOrUpdateExhibitorProfile);
router.delete('/profile', protect, deleteExhibitorProfile);

export default router;
