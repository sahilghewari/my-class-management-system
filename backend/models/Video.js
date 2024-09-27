const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  link: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Video', videoSchema);
