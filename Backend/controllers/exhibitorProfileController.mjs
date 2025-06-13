import ExhibitorProfile from "../models/ExhibitorProfile.mjs";

export const getExhibitorProfile = async (req, res) => {
    try {
        const profile = await ExhibitorProfile.findOne({ user: req.user.id });
        if (!profile) return res.status(404).json({ msg: "Profile not found" });
        res.json(profile);
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};


export const getAllExhibitorProfiles = async (req, res) => {
  try {
    const profiles = await ExhibitorProfile.find().populate('user', ['name', 'email']);
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

  

export const createOrUpdateExhibitorProfile = async (req, res) => {
    try {
        const profileData = { ...req.body, user: req.user.id };
        const profile = await ExhibitorProfile.findOneAndUpdate(
            { user: req.user.id },
            profileData,
            { new: true, upsert: true }
        );
        res.json(profile);
    } catch (err) {
        res.status(500).json({ msg: "Error updating profile", error: err.message });
    }
};

export const deleteExhibitorProfile = async (req, res) => {
    try {
        await ExhibitorProfile.findOneAndDelete({ user: req.user.id });
        res.json({ msg: "Profile deleted" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting profile", error: err.message });
    }
};
