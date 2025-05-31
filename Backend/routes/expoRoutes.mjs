import express from 'express';
import { createExpo, getAllExpos, updateExpo, deleteExpo, showExpo } from '../controllers/expoController.mjs';
import { protect } from '../middlewares/authMiddleware.mjs';
import { authorizeRoles } from '../middlewares/roleMiddleware.mjs';

const router = express.Router();

router.post('/', protect, authorizeRoles('admin', 'organizer'), createExpo);
router.get('/', getAllExpos);
router.put('/:id', protect, authorizeRoles('admin', 'organizer'), updateExpo);
router.delete('/:id', protect, authorizeRoles('admin', 'organizer'), deleteExpo);
router.get('/:id', protect, authorizeRoles('admin', 'organizer'), showExpo);

export default router;
