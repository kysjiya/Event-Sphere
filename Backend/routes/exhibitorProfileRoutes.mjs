import express from "express";
import {
    getExhibitorProfile,
    createOrUpdateExhibitorProfile,
    deleteExhibitorProfile
} from "../controllers/exhibitorProfileController.mjs";
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/profile', protect, getExhibitorProfile);
router.post('/profile', protect, createOrUpdateExhibitorProfile);
router.delete('/profile', protect, deleteExhibitorProfile);

export default router;
