import Analytics from '../models/Analytics.mjs';

export const getAnalyticsByExpo = async (req, res) => {
    try {
        const data = await Analytics.find({ expo: req.params.expoId });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ msg: 'Error retrieving analytics', error: err.message });
    }
};

export const updateAnalytics = async (req, res) => {
    const { expo, type, refId } = req.body;
    try {
        const updated = await Analytics.findOneAndUpdate(
            { expo, type, refId },
            { $inc: { interactions: 1 }, $set: { lastUpdated: new Date() } },
            { new: true, upsert: true }
        );
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ msg: 'Error updating analytics', error: err.message });
    }
};
