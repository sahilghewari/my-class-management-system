// backend/routes/inquiries.js

const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');

// POST: Submit an inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, courseTitle, phone, contactTime, reason, comments } = req.body;

    // Validate required fields
    if (!name || !email || !courseTitle || !phone || !contactTime || !reason) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Additional validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address.' });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Please provide a valid 10-digit phone number.' });
    }

    // Create a new inquiry
    const newInquiry = new Inquiry({
      name,
      email,
      courseTitle,
      phone,
      contactTime,
      reason,
      comments,
    });

    // Save the inquiry to the database
    await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully!', inquiry: newInquiry });

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// GET: Retrieve all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
