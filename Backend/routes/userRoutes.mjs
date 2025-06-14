import express from 'express';
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';
import { authorizeRoles } from '../middlewares/roleMiddleware.mjs';

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.get('/:id', protect, authorizeRoles('admin'), getUserById);
router.post('/', protect, authorizeRoles('admin'), createUser);
router.put('/:id', protect, authorizeRoles('admin'), updateUser);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

export default router;
