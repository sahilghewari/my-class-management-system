const jwt = require('jsonwebtoken');

// Authentication Middleware
const authMiddleware = (req, res, next) => {
  // Corrected header extraction
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const token = authHeader.split(' ')[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach the user info to request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Role Verification Middleware
const verifyRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; // Ensure the role is attached to the user
    if (userRole !== role) {
      return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// Export both middlewares
module.exports = {
  authMiddleware,
  verifyRole,
};
