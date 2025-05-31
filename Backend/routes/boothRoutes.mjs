import express from 'express';
import {
  getBooths,
  reserveOrUpdateBooth,
  cancelReservation
} from '../controllers/boothController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// Public: Get all booths for an expo
router.get('/:expoId', protect, getBooths);

// Exhibitor: Reserve or update their booth
router.put('/reserve/:boothId', protect, reserveOrUpdateBooth);

// Exhibitor: Cancel reservation
router.delete('/cancel/:boothId', protect, cancelReservation);

export default router;
