const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

// Upload a video
router.post('/upload', async (req, res) => {
  const { link } = req.body;
  const teacherId = req.user.id; // Assuming you have user authentication

  try {
    const newVideo = new Video({ link, teacherId });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error });
  }
});

// Fetch videos for the teacher
router.get('/', async (req, res) => {
  const teacherId = req.user.id; // Assuming you have user authentication

  try {
    const videos = await Video.find({ teacherId });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
});

module.exports = router;
