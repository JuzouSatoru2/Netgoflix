const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (token.length <= 10) {
    return res.status(401).json({ message: 'Auth Error' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_KEY ? process.env.JWT_KEY : 'randomString'
    );
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Invalid Token' });
  }
};
