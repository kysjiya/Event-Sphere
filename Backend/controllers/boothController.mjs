import Booth from '../models/Booth.mjs';

export const createBooths = async (req, res) => {
  const { expoId } = req.params;
  const { hall, row, startNumber, endNumber, price, boothSize } = req.body;

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

export const getBoothsByExpoId = async (req, res) => {
  try {
    const booths = await Booth.find({ expo: req.params.expoId });
    res.json(booths);
  } catch (err) {
    console.error("Error getting booths:", err);
    res.status(500).json({ msg: 'Server error' });
  }
};


export const getBoothById = async (req, res) => {
  try {
    const booth = await Booth.findById(req.params.boothId);
      console.log('GET /booth/:boothId hit', req.params.boothId); // ✅ Add this

    if (!booth) return res.status(404).json({ msg: 'Booth not found' });
    res.json(booth);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};



// PUT /api/booth/:boothId
export const updateBoothById = async (req, res) => {
  try {
    const booth = await Booth.findById(req.params.boothId);
    if (!booth) {
      return res.status(404).json({ msg: 'Booth not found' });
    }

    const { hall, row, boothNumber, price, boothSize, status } = req.body;

    if (hall) booth.hall = hall;
    if (row) booth.row = row;
    if (boothNumber) booth.number = boothNumber;
    if (price) booth.price = price;
    if (boothSize) booth.size = boothSize;
    if (status) booth.status = status;

    await booth.save();
    res.json({ msg: 'Booth updated successfully', booth });
  } catch (err) {
    console.error("Error updating booth:", err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

