import User from '../models/User.mjs';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
