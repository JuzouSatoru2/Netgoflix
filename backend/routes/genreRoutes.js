const express = require('express');
const Movies = require('../models/movie');
const router = express.Router();

router.get('/:genre', async (req, res) => {
  const movie = await Movies.find({ genre: req.params.genre });
  if (!movie) {
    res.status(404);
  }
  if (movie) {
    res.json(movie);
  }
});

module.exports = router;
