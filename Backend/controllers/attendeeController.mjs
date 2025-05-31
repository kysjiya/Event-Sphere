import Attendee from '../models/Attendee.mjs';
import Expo from '../models/Expo.mjs';
import Schedule from '../models/Schedule.mjs';

export const getAttendeeProfile = async (req, res) => {
    try {
        const attendee = await Attendee.findById(req.params.id)
            .populate('registeredExpos')
            .populate('registeredSessions');
        res.status(200).json(attendee);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching profile', error: err.message });
    }
};

export const registerForExpo = async (req, res) => {
    try {
        const attendee = await Attendee.findById(req.params.id);
        if (!attendee.registeredExpos.includes(req.body.expoId)) {
            attendee.registeredExpos.push(req.body.expoId);
            await attendee.save();
        }
        res.status(200).json(attendee);
    } catch (err) {
        res.status(500).json({ msg: 'Expo registration failed', error: err.message });
    }
};

export const registerForSession = async (req, res) => {
    try {
        const attendee = await Attendee.findById(req.params.id);
        if (!attendee.registeredSessions.includes(req.body.sessionId)) {
            attendee.registeredSessions.push(req.body.sessionId);
            await attendee.save();
        }
        res.status(200).json(attendee);
    } catch (err) {
        res.status(500).json({ msg: 'Session registration failed', error: err.message });
    }
};
