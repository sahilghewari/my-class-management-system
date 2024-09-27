const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify JWT Token
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

// Role-based access control
exports.verifyRole = (role) => {
  return async (req, res, next) => {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== role) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
};
