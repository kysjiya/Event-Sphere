import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    registeredExpos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expo' }],
    // registeredSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }]
}, { timestamps: true });

export default mongoose.model('Attendee', attendeeSchema);
