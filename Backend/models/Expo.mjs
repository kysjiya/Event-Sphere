import mongoose from 'mongoose';

const ExpoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String },
  theme: { type: String },
  floorPlan: { type: String }, // Could be a file URL or image path
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('Expo', ExpoSchema);
