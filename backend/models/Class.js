const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Class', classSchema);
