const express = require('express');
const router = express.Router();
const verifyRole = require('../middleware/authMiddleware'); // Adjust the path as necessary
const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have an authentication middleware

// Assuming you have a middleware to authenticate users and add `req.user`
router.get('/teacher-dashboard', authenticate, verifyRole('teacher'), (req, res) => {
  res.json({ success: true, message: 'Welcome to the Teacher Dashboard!' });
});

module.exports = router;
