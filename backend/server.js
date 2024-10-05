const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const courseRoutes = require('./routes/courses'); 
const notificationRoutes = require('./routes/Notifications');
const bodyParser = require('body-parser');
const inquiriesRoute = require('./routes/inquiries');
const nodemailer = require('nodemailer');
const Inquiries = require('./models/Inquiry'); 


dotenv.config();  

const app = express();


app.use(cors({
  origin: 'http://localhost:5173',  // Specify the frontend origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',  // Allow all necessary HTTP methods
  credentials: true,  // Allow cookies/auth headers (if applicable)
}));

app.use(express.json());  
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Permissions-Policy", "geolocation=(self), microphone=(), camera=()");
  next();
});
//nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


app.post('/api/inquiries/:inquiryId/send-email', async (req, res) => {
  const inquiryId = req.params.inquiryId;
  const { email, message } = req.body;

  try {
    const inquiry = await Inquiries.findById(inquiryId);
    if (!inquiry) {
      return res.status(404).send('Inquiry not found');
    }

    // Send email
    await transporter.sendMail({
      from: 'sahilghewari6@gmail.com',
      to: inquiry.email,
      subject: 'Response to your inquiry',
      text: message,
    });

    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};


connectDB();

// Routes
app.use('/api', adminRoutes);

app.use('/api/auth', authRoutes);  
app.use('/api/courses', courseRoutes); 
app.use('/api/notifications', notificationRoutes);
app.use('/api/inquiries', inquiriesRoute);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
