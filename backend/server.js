const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courses'); // Adjust the path as necessary
const notificationRoutes = require('./routes/Notifications');


dotenv.config();  // Load environment variables

const app = express();

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

// Connect to MongoDB before starting the server
connectDB();

// Routes
app.use('/api/auth', authRoutes);  // Register auth routes
app.use('/api/courses', courseRoutes); // Add this line to use your routes
app.use('/api/notifications', notificationRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
