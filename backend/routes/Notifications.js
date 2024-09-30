const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification'); // Make sure to create a Notification model

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).send(notification);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.send(notifications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).send();
    }
    res.send(notification);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
