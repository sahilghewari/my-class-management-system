const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Notification', notificationSchema);

