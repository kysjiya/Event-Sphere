import mongoose from "mongoose";

const ExhibitorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // link to registered user
  companyName: { type: String, required: true },
  description: { type: String },
  logo: { type: String }, // optional image URL
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  products: [String],
  documents: [String], // URLs or file names of uploaded documents
  boothNumber: { type: String }, // optional booth selection
  expo: { type: mongoose.Schema.Types.ObjectId, ref: 'Expo', required: true },
  isApproved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Exhibitor', ExhibitorSchema);
