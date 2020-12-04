const express = require('express');
const Movies = require('../models/movie');
const router = express.Router();

// Create
router.post('/', (req, res) => {
  try {
    let movie = new Movies();
    movie.name = req.body.name;
    movie.date = req.body.date;
    movie.usk = req.body.usk;
    movie.genre = req.body.genre;
    movie.isSerie = req.body.isSerie;
    movie.username = req.body.username;
    movie.description = req.body.description;
    movie = movie.save();
    res.json('Posted movie');
  } catch (e) {
    res.status(400).json('Failed posting movie');
  }
});

// Read
router.get('/', async (req, res) => {
  const movie = await Movies.find().sort({
    createdAt: 'desc',
  });
  res.status(200).json(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movies.findById(req.params.id);
  if (!movie) {
    res.status(404);
  }
  if (movie) {
    res.json(movie);
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    let movie = await Movies.findById(req.params.id);
    movie.name = req.body.name;
    movie.date = req.body.date;
    movie.usk = req.body.usk;
    movie.genre = req.body.genre;
    movie.isSerie = req.body.isSerie;
    movie.username = req.body.username;
    movie.description = req.body.description;
    movie = movie.save();
    res.json('Put movie');
  } catch (e) {
    res.status(400).json('Failed putting movie');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let movie = await Movies.findById(req.params.id);
    movie.name = req.body.name;
    movie.date = req.body.date;
    movie.usk = req.body.usk;
    movie.genre = req.body.genre;
    movie.isSerie = req.body.isSerie;
    movie.username = req.body.username;
    movie.description = req.body.description;
    movie = movie.save();
    res.json('Patched movie');
  } catch (e) {
    res.status(400).json('Failed patching movie');
  }
});

// delete
router.delete('/:id', async (req, res) => {
  await Movies.findByIdAndDelete(req.params.id);
  res.json('Deleted movie');
});

module.exports = router;
