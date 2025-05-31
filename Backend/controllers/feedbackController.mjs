import Feedback from '../models/Feedback.mjs';

// Submit new feedback
export const submitFeedback = async (req, res) => {
  const { message, type } = req.body;
  try {
    const feedback = new Feedback({
      user: req.user.id,
      message,
      type: type || 'suggestion',
    });
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Get all feedback (for admin/organizer only)
export const getAllFeedback = async (req, res) => {
  try {
    // Optional: filter by status, type via query params
    const feedbacks = await Feedback.find().populate('user', 'name email role').sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Update feedback status (admin/organizer only)
export const updateFeedbackStatus = async (req, res) => {
  const { feedbackId } = req.params;
  const { status } = req.body;
  try {
    const feedback = await Feedback.findById(feedbackId);
    if (!feedback) return res.status(404).json({ msg: 'Feedback not found' });
    feedback.status = status;
    feedback.updatedAt = Date.now();
    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
