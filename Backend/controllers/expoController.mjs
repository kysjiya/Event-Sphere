import Expo from '../models/Expo.mjs';

export const createExpo = async (req, res) => {
  try {
    const { title, date, location, description, theme } = req.body;
    const floorPlan = req.file?.buffer?.toString('base64') || null; // or store path if using disk

    const expo = await Expo.create({
      title,
      date,
      location,
      description,
      theme,
      floorPlan,
      createdBy: req.user.id
    });

    res.status(201).json(expo);
  } catch (err) {
    console.error("Expo creation failed:", err);
    res.status(500).json({ msg: 'Error creating expo', error: err.message });
  }
  
};

export const getAllExpos = async (req, res) => {
  try {
    const expos = await Expo.find();
    res.status(200).json(expos);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching expos', error: err.message });
  }
};

export const updateExpo = async (req, res) => {
  try {
    console.log('REQ BODY:', req.body);
    console.log('REQ FILE:', req.file);
    console.log('PARAMS:', req.params);

    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ msg: 'Expo not found' });
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ msg: 'Invalid expo ID' });
}

    // Optional: Authorization check
    if (expo.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update this expo' });
    }

    const { title, description, date, location, theme } = req.body;
    if (title) expo.title = title;
    if (description) expo.description = description;
    if (date) expo.date = date;
    if (location) expo.location = location;
    if (theme) expo.theme = theme;

    if (req.file && req.file.buffer) {
      expo.floorPlan = req.file.buffer.toString('base64');
    }

    await expo.save();

    res.status(200).json({ msg: 'Expo updated successfully', expo });
  } catch (err) {
    console.error('UPDATE ERROR:', err);
    res.status(500).json({ msg: 'Error updating expo', error: err.message });
  }
};



// Update expo
export const showExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ msg: 'Expo not found' });

    // Optional: check if the logged-in user is the creator
    if (expo.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update this expo' });
    }
    res.status(200).json(expo);
  } catch (err) {
    res.status(500).json({ msg: 'Error finding expo', error: err.message });
  }
};

// Delete expo
export const deleteExpo = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ msg: 'Expo not found' });

    // Optional: check if the logged-in user is the creator
    if (expo.createdBy.toString() !== req.user.id && req.user.role !== 'admin')
 {
      return res.status(403).json({ msg: 'Not authorized to delete this expo' });
    }

    await expo.deleteOne();
    res.status(200).json({ msg: 'Expo deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting expo', error: err.message });
  }
};

export const getExpoById = async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id);
    if (!expo) return res.status(404).json({ msg: 'Expo not found' });
    res.json(expo);
  } catch (err) {
    console.error("Error getting expo:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};
