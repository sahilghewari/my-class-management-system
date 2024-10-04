const dotenv = require('dotenv');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

dotenv.config();

const adminLogin = (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    // Simulating JWT or session token creation
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(401).json({ message: 'Invalid credentials' });
};
const updateAdminDetails = (req, res) => {
    const { email, password } = req.body;
  
    // Update admin details
    if (email) {
        adminLogin.email = email;
    }
  
    if (password) {
      // Hash the new password
      const hashedPassword = bcrypt.hashSync(password, 10);
      adminLogin.password = hashedPassword;
    }
  
    return res.status(200).json({ message: 'Admin details updated successfully' });
  };
  
  module.exports = {
    adminLogin,
    updateAdminDetails,
  };
