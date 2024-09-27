const express = require('express');
const router = express.Router();
const Class = require('../models/Class');

// Schedule a class
router.post('/schedule', async (req, res) => {
  const { title, date, time } = req.body;
  const teacherId = req.user.id; // Assuming you have user authentication

  try {
    const newClass = new Class({ title, date, time, teacherId });
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling class', error });
  }
});

// Add more routes as needed...

module.exports = router;
