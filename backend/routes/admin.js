// backend/routes/admin.js

const express = require('express');
const router = express.Router();
const { verifyAdminToken } = require('../middlewares/auth');
const { Course, User, Schedule } = require('../models');

// Course Management Routes
router.post('/course', verifyAdminToken, async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/course/:id', verifyAdminToken, async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/course/:id', verifyAdminToken, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User Management Routes
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/user/:id', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Schedule Management Routes
router.post('/schedule', verifyAdminToken, async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
