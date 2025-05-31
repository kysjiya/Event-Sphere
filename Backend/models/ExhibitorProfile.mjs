import mongoose from "mongoose";

const exhibitorProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    companyName: String,
    logo: String,
    description: String,
    contactEmail: String,
    phone: String,
    website: String,
    products: [String],
    booth: {
        number: String,
        size: String,
        staff: [String]
    }
}, { timestamps: true });

export default mongoose.model("ExhibitorProfile", exhibitorProfileSchema);
