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
  },
  rating: {
    type: Number,
    default: 0
  },
  ranking: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Progress', progressSchema);
