const express = require('express');
const Movies = require('../models/movie');
const router = express.Router();
const slugify = require('slugify');
const auth = require('../lib/auth');

// Create
router.post('/', auth, (req, res) => {
  try {
    let movie = new Movies();
    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });
    movie.name = req.body.name;
    movie.date = req.body.date;
    movie.fsk = req.body.fsk;
    movie.genre = req.body.genre;
    movie.isSerie = req.body.isSerie;
    movie.username = req.body.username;
    movie.description = req.body.description;
    movie.duration = req.body.duration;
    movie.slug = slug;
    movie = movie.save();
    res.json({
      status: 'Posted movie',
      slug: slug,
    });
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

router.get('/:slug', async (req, res) => {
  const movie = await Movies.findOne({ slug: req.params.slug });
  if (!movie) {
    res.status(404);
  }
  if (movie) {
    res.json(movie);
  }
});

// Update
router.put('/:slug', auth, async (req, res) => {
  try {
    let movie = await Movies.findOne({ slug: req.params.slug });
    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });
    movie.name = req.body.name;
    movie.date = req.body.date;
    movie.fsk = req.body.fsk;
    movie.genre = req.body.genre;
    movie.isSerie = req.body.isSerie;
    movie.username = req.body.username;
    movie.description = req.body.description;
    movie.duration = req.body.duration;
    movie.slug = slug;
    movie = movie.save();
    res.json({ status: 'Put movie', slug: slug });
  } catch (e) {
    res.status(400).json('Failed putting movie');
  }
});

router.patch('/:slug', auth, async (req, res) => {
  try {
    let movie = await Movies.findOne({ slug: req.params.slug });
    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });
    movie.name = req.body.name;
    movie.date = req.body.date;
    movie.fsk = req.body.fsk;
    movie.genre = req.body.genre;
    movie.isSerie = req.body.isSerie;
    movie.username = req.body.username;
    movie.description = req.body.description;
    movie.duration = req.body.duration;
    movie.slug = slug;
    movie = movie.save();
    res.json({ status: 'Patched movie', slug: slug });
  } catch (e) {
    res.status(400).json('Failed patching movie');
  }
});

// delete
router.delete('/:id', auth, async (req, res) => {
  await Movies.findByIdAndDelete(req.params.id);
  res.json('Deleted movie');
});

module.exports = router;
