import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    expo: { type: mongoose.Schema.Types.ObjectId, ref: 'Expo', required: true },
    sessionTitle: { type: String, required: true },
    description: { type: String },
    speaker: { type: String },
    topic: { type: String },
    location: { type: String },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model('Schedule', scheduleSchema);
