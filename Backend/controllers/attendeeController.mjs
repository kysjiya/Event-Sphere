import Attendee from '../models/Attendee.mjs';
import User from '../models/User.mjs';

import Expo from '../models/Expo.mjs';
import Schedule from '../models/Schedule.mjs';

export const getAttendeeProfile = async (req, res) => {
    try {
        const attendee = await User.findById(req.params.id)
            .populate('registeredExpos')
            .populate('registeredSessions');
        res.status(200).json(attendee);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching profile', error: err.message });
    }
};

export const registerForExpo = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Find or create attendee
    let attendee = await Attendee.findOne({ email: user.email });

    if (!attendee) {
      attendee = new Attendee({
        name: user.name,
        email: user.email,
        registeredExpos: [req.body.expoId],
      });
    } else {
      if (!attendee.registeredExpos.includes(req.body.expoId)) {
        attendee.registeredExpos.push(req.body.expoId);
      }
    }

    await attendee.save();
    res.status(200).json({ msg: 'Successfully registered', attendee });
  } catch (err) {
    console.error("Registration Error:", err);
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
