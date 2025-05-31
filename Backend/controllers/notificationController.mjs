import Notification from '../models/Notification.mjs';

// Get notifications for logged-in user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  const { notificationId } = req.params;
  try {
    const notification = await Notification.findOne({ _id: notificationId, user: req.user.id });
    if (!notification) return res.status(404).json({ msg: 'Notification not found' });
    notification.read = true;
    await notification.save();
    res.json({ msg: 'Notification marked as read' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Create notification (used internally by server/admin)
export const createNotification = async (req, res) => {
  const { user, title, message, link } = req.body;
  try {
    const notification = new Notification({ user, title, message, link });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};
