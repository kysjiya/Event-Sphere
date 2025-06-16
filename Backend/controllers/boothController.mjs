import Booth from '../models/Booth.mjs';

// Create multiple booths for a specific expo
export const createBooths = async (req, res) => {
  const { expoId } = req.params;
  const { hall, row, startNumber, endNumber, price, boothSize } = req.body;

  if (!hall || !row || !startNumber || !endNumber || !boothSize) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  try {
    const booths = [];

    for (let i = parseInt(startNumber); i <= parseInt(endNumber); i++) {
      const boothNumber = `${hall}-${row}-${i}`;
      const location = `Hall ${hall} - Row ${row}, Booth ${i}`;

      const booth = await Booth.create({
        expo: expoId,
        number: boothNumber,
        location,
        size: boothSize,
        price,
        status: 'available'
      });

      booths.push(booth);
    }

    res.status(201).json({ msg: 'Booths created successfully', booths });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get booths for a specific expo
export const getBooths = async (req, res) => {
  const { expoId } = req.params;
  try {
    const booths = await Booth.find({ expo: expoId });
    res.json(booths);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Reserve or update a booth (exhibitor only)
export const reserveOrUpdateBooth = async (req, res) => {
  const { boothId } = req.params;

  try {
    const booth = await Booth.findById(boothId);
    if (!booth) return res.status(404).json({ msg: 'Booth not found' });

    if (booth.reservedBy && booth.reservedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ msg: 'Booth already reserved by another exhibitor' });
    }

    booth.reservedBy = req.user.id;
    booth.status = 'reserved';

    await booth.save();
    res.json({ msg: 'Booth reserved successfully', booth });
  } catch (err) {
    console.error("Booth reservation error:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};


// Cancel a booth reservation
export const cancelReservation = async (req, res) => {
  const { boothId } = req.params;

  try {
    const booth = await Booth.findById(boothId);
    if (!booth) return res.status(404).json({ msg: 'Booth not found' });

    if (!booth.reservedBy || booth.reservedBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to cancel this reservation' });
    }

    booth.reservedBy = null;
    booth.products = [];
    booth.staff = [];
    booth.status = 'available';

    await booth.save();
    res.json({ msg: 'Reservation cancelled successfully', booth });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Optional: Get booths by expo ID
export const getBoothsByExpoId = async (req, res) => {
  try {
    const booths = await Booth.find({ expo: req.params.expoId });
    if (!booths || booths.length === 0) {
      return res.status(404).json({ msg: 'No booths found for this expo' });
    }
    res.json(booths);
  } catch (err) {
    console.error('Error getting booths:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
