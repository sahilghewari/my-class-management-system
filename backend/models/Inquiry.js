// backend/models/Inquiry.js

const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  courseTitle: { type: String, required: true },
  phone: { type: String, required: true },
  contactTime: { type: String, required: true },
  reason: { type: String, required: true },
  comments: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', InquirySchema);
