import mongoose from 'mongoose';

const BoothSchema = new mongoose.Schema({
  expo: { type: mongoose.Schema.Types.ObjectId, ref: 'Expo', required: true },
  number: { type: String, required: true },
  location: { type: String }, // e.g., "Hall A - Row 3, Booth 12"
  size: { type: String }, // e.g., "10x10"
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'ExhibitorProfile', default: null },
  products: [{ type: String }], // showcased products or services
  staff: [{ name: String, contact: String }],
  status: { type: String, enum: ['available', 'reserved', 'occupied'], default: 'available' }
}, { timestamps: true });

export default mongoose.model('Booth', BoothSchema);
