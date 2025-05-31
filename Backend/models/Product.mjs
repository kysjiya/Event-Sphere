import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: 'ExhibitorProfile', required: true },
  name: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],  // URLs or paths to images
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductSchema);
