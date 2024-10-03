const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// @route POST /api/auth/signup
// @desc Register a new user
router.post('/signup', signup);

// @route POST /api/auth/login
// @desc Authenticate user & get token
router.post('/login', login);

router.get('/', async (req, res) => {
    try {
      const users = await User.find(); // Fetch all users from MongoDB
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
