const express = require('express');
const { signup, login } = require('../controllers/authController');
const { getUsers } = require('../controllers/userController'); 

const router = express.Router();




// @route POST /api/auth/signup
// @desc Register a new user
router.post('/signup', signup);

// @route POST /api/auth/login
// @desc Authenticate user & get token
router.post('/login', login);

router.get('/users', getUsers);

module.exports = router;
