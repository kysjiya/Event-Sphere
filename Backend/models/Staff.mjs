import mongoose from 'mongoose';

const StaffSchema = new mongoose.Schema({
  exhibitor: { type: mongoose.Schema.Types.ObjectId, ref: 'ExhibitorProfile', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  contactEmail: { type: String },
  contactPhone: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Staff', StaffSchema);
