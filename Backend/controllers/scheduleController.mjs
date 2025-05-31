import Schedule from '../models/Schedule.mjs';

export const createSchedule = async (req, res) => {
    try {
        const schedule = await Schedule.create(req.body);
        res.status(201).json(schedule);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to create schedule', error: err.message });
    }
};

export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate('expo');
        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch schedules', error: err.message });
    }
};

export const updateSchedule = async (req, res) => {
    try {
        const updated = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to update schedule', error: err.message });
    }
};

export const deleteSchedule = async (req, res) => {
    try {
        await Schedule.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Schedule deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to delete schedule', error: err.message });
    }
};
