import express from 'express';
import {
  getStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from '../controllers/staffController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();



router.get('/', protect,  getStaff);
router.post('/', protect,  addStaff);
router.put('/:staffId', protect,  updateStaff);
router.delete('/:staffId', protect, deleteStaff);

export default router;
