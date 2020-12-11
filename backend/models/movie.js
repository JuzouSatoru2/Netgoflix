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
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Movie', movieSchema);
