const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  usk: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  isSerie: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
