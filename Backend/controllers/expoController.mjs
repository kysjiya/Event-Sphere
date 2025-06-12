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

// Update expo
export const updateExpo = async (req, res) => {
  try {
   // Example Express route to get expo by ID
  app.get('/api/expos/:id', authenticateUser, async (req, res) => {
  try {
    const expo = await Expo.findById(req.params.id)
    if (!expo) return res.status(404).json({ msg: 'Expo not found' })
    res.json(expo)
  } catch (error) {
    res.status(500).json({ msg: 'Server error' })
  }
})

    // Optional: check if the logged-in user is the creator
    if (Expo.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update this expo' });
    }

    const updatedExpo = await Expo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExpo);
  } catch (err) {
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

