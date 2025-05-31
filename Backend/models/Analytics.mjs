import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
    expo: { type: mongoose.Schema.Types.ObjectId, ref: 'Expo', required: true },
    type: { type: String, enum: ['booth', 'session', 'attendee'], required: true },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true }, // booth/session ID
    interactions: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
