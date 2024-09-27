const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get notifications for the teacher
router.get('/', async (req, res) => {
  const teacherId = req.user.id; // Assuming you have user authentication

  try {
    const notifications = await Notification.find({ teacherId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
});

module.exports = router;
