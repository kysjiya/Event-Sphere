import express from 'express';
import {
  createBooths,
  getBooths,
  reserveOrUpdateBooth,
  cancelReservation,
  getBoothById,
  updateBoothById
} from '../controllers/boothController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// Create booths for an expo
router.post('/:expoId', protect, createBooths);

// Get all booths for a specific expo
router.get('/expo/:expoId', protect, getBooths); // 👈 Changed to /expo/:expoId

// Get single booth by booth ID
router.get('/booth/:boothId', getBoothById);

// Exhibitor actions
router.put('/reserve/:boothId', protect, reserveOrUpdateBooth);
router.delete('/cancel/:boothId', protect, cancelReservation);

// Admin: update booth by ID
router.put('/:boothId', updateBoothById);

// Remove this conflicting route:

export default router;
