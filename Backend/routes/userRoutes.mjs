import express from 'express';
import { getAllUsers } from '../controllers/userController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();

router.get('/', protect, getAllUsers); // <--- this is /api/users

export default router;

