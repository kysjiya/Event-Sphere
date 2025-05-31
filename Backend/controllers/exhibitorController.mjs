import Exhibitor from '../models/Exhibitor.mjs';

export const registerExhibitor = async (req, res) => {
  const { companyName, description, contactInfo, products, expo } = req.body;

  try {
    const exists = await Exhibitor.findOne({ user: req.user.id, expo });
    if (exists) return res.status(400).json({ msg: 'Already registered for this expo' });

    const exhibitor = await Exhibitor.create({
      user: req.user.id,
      companyName,
      description,
      contactInfo,
      products,
      expo
    });

    res.status(201).json(exhibitor);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

export const getMyExhibitorProfile = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findOne({ user: req.user.id }).populate('expo');
    if (!exhibitor) return res.status(404).json({ msg: 'No exhibitor profile found' });
    res.status(200).json(exhibitor);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

export const updateExhibitorProfile = async (req, res) => {
  try {
    const updated = await Exhibitor.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

export const getAllExhibitors = async (req, res) => {
  try {
    const exhibitors = await Exhibitor.find({ expo: req.params.expoId }).populate('user');
    res.status(200).json(exhibitors);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

export const approveExhibitor = async (req, res) => {
  try {
    const exhibitor = await Exhibitor.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    if (!exhibitor) return res.status(404).json({ msg: 'Exhibitor not found' });
    res.status(200).json({ msg: 'Exhibitor approved', exhibitor });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};
