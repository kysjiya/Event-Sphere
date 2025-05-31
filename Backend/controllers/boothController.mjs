import Booth from '../models/Booth.mjs';

// Get booths for an expo
export const getBooths = async (req, res) => {
  const { expoId } = req.params;
  try {
    const booths = await Booth.find({ expo: expoId });
    res.json(booths);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Reserve or update a booth (exhibitor portal)
export const reserveOrUpdateBooth = async (req, res) => {
  const { boothId } = req.params;
  const { products, staff } = req.body;
  try {
    const booth = await Booth.findById(boothId);

    if (!booth) return res.status(404).json({ msg: 'Booth not found' });

    if (booth.reservedBy && booth.reservedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Booth already reserved by another exhibitor' });
    }

    booth.reservedBy = req.user.id;
    booth.products = products || booth.products;
    booth.staff = staff || booth.staff;
    booth.status = 'reserved';

    await booth.save();
    res.json(booth);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Cancel reservation
export const cancelReservation = async (req, res) => {
  const { boothId } = req.params;
  try {
    const booth = await Booth.findById(boothId);

    if (!booth) return res.status(404).json({ msg: 'Booth not found' });

    if (!booth.reservedBy || booth.reservedBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to cancel this reservation' });
    }

    booth.reservedBy = null;
    booth.products = [];
    booth.staff = [];
    booth.status = 'available';

    await booth.save();
    res.json({ msg: 'Reservation cancelled', booth });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
