import Product from '../models/Product.mjs';

// Get all products of logged-in exhibitor
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ exhibitor: req.user.id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Add new product
export const addProduct = async (req, res) => {
  const { name, description, images } = req.body;
  try {
    const newProduct = new Product({
      exhibitor: req.user.id,
      name,
      description,
      images,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, images } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.exhibitor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    product.name = name || product.name;
    product.description = description || product.description;
    product.images = images || product.images;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    if (product.exhibitor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    await product.remove();
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
