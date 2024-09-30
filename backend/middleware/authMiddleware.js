const jwt = require('jsonwebtoken');

// Authentication Middleware
const authMiddleware = (req, res, next) => {
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

// Export the authentication middleware
module.exports = {
  authMiddleware,
};
