const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();

dotenv.config();  // Load environment variables

app.use(cors());  // Enable CORS for frontend-backend communication
app.use(express.json());  // Parse JSON bodies

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);  // Exit process on failure
  }
};

// Routes
app.use('/api/auth', authRoutes);  // Register auth routes

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();  // Connect to MongoDB when server starts
});
