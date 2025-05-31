import Staff from '../models/Staff.mjs';

// Get all staff for logged-in exhibitor
export const getStaff = async (req, res) => {
  try {
    const staffList = await Staff.find({ exhibitor: req.user.id });
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Add new staff member
export const addStaff = async (req, res) => {
  const { name, role, contactEmail, contactPhone } = req.body;
  try {
    const newStaff = new Staff({
      exhibitor: req.user.id,
      name,
      role,
      contactEmail,
      contactPhone,
    });
    const savedStaff = await newStaff.save();
    res.status(201).json(savedStaff);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update staff member
export const updateStaff = async (req, res) => {
  const { staffId } = req.params;
  const { name, role, contactEmail, contactPhone } = req.body;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ msg: 'Staff member not found' });
    if (staff.exhibitor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    staff.name = name || staff.name;
    staff.role = role || staff.role;
    staff.contactEmail = contactEmail || staff.contactEmail;
    staff.contactPhone = contactPhone || staff.contactPhone;
    const updatedStaff = await staff.save();
    res.json(updatedStaff);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Delete staff member
export const deleteStaff = async (req, res) => {
  const { staffId } = req.params;
  try {
    const staff = await Staff.findById(staffId);
    if (!staff) return res.status(404).json({ msg: 'Staff member not found' });
    if (staff.exhibitor.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized' });
    }
    await staff.remove();
    res.json({ msg: 'Staff member deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
