const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  solved: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Progress', progressSchema);
