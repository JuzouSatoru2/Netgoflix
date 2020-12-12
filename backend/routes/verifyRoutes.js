const express = require('express');
const router = express.Router();

const auth = require('../lib/auth');
const User = require('../models/user');

// req.user is getting fetched from auth middleware after token authentication
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: 'Error in fetching user' });
  }
});

module.exports = router;
