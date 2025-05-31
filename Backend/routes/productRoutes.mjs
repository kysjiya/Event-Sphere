import express from 'express';
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.mjs';

import { protect } from '../middlewares/authMiddleware.mjs';

const router = express.Router();



router.get('/', protect, getProducts);
router.post('/',protect, addProduct);
router.put('/:productId', protect,  updateProduct);
router.delete('/:productId', protect, deleteProduct);

export default router;
