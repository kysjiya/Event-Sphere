import Expo from '../models/Expo.mjs';
import mongoose from 'mongoose'; // required for ObjectId validation
import express from 'express';

const app = express();
app.use(express.json());

import multer from 'multer';
const upload = multer();


export const createExpo = async (req, res) => {
  try {
    const { title, date, location, description, theme } = req.body;

    // Handle image file if present
    const floorPlan = req.file?.buffer?.toString('base64') || null;

    const expo = await Expo.create({
      title,
      date,
      location,
      description,
      theme,
      floorPlan,
      createdBy: req.user.id,
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
  const { id } = req.params;
  const { title, date, location, description, theme } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid expo ID' });
    }

    const expo = await Expo.findById(id);
    if (!expo) return res.status(404).json({ msg: 'Expo not found' });

    // Authorization check
    if (expo.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Not authorized to update this expo' });
    }

    // Update only if provided
    if (title) expo.title = title;
    if (date) expo.date = date;
    if (location) expo.location = location;
    if (description) expo.description = description;
    if (theme) expo.theme = theme;

    // Update image if provided
    if (req.file?.buffer) {
      expo.floorPlan = req.file.buffer.toString('base64');
    }

    await expo.save();
    res.status(200).json({ msg: 'Expo updated successfully', expo });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
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
    if (expo.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
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
