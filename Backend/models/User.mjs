import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    role: { type: String, required: true, enum: ['admin', 'organizer', 'exhibitor', 'attendee'], default: 'attendee'}
}, { timestamps: true});

export default mongoose.model('User', UserSchema);
