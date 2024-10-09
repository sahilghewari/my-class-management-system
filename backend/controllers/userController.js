const User = require('../models/User'); // Adjust this path to your User model

// @route GET /api/users
// @desc Fetch all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Assuming you're using Mongoose
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
