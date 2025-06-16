import express from 'express';
import {
  createBooths,
  getBooths,
  reserveOrUpdateBooth,
  cancelReservation,
  getBoothsByExpoId,
  getBoothById,
  updateBoothById
} from '../controllers/boothController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

// Create booths for an expo (Admin/Organizer only)
router.post('/:expoId', protect, createBooths);

// Public: Get all booths for an expo
router.get('/:expoId', getBooths);

// Exhibitor: Reserve or update their booth
router.put('/reserve/:boothId', protect, reserveOrUpdateBooth);

// Exhibitor: Cancel reservation
router.delete('/cancel/:boothId', protect, cancelReservation);

// Optional: Get booths by expoId (if used elsewhere)
router.get('/by-expo/:expoId', getBoothsByExpoId);

router.get('/booth/:boothId', getBoothById);
router.put('/:boothId', updateBoothById);

router.get("/:expoId", getBoothsByExpoId); 
export default router;
