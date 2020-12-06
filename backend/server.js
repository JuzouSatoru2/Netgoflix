require('dotenv').config();
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const morgan = require('morgan');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3001;

// Add routes
const movieRoutes = require('./routes/movieRoutes');
const genreRoutes = require('./routes/genreRoutes');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const verifyRoutes = require('./routes/verifyRoutes');

// Init Server
const server = express();
server.use(helmet());
server.use(compression());
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('trust proxy', true);

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Init database handler
if (process.env.DATABASE_URL) {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('\x1b[36minfo', '\x1b[0m - Connected to MongoDB');
  });
} else {
  console.log('\x1b[36minfo', '\x1b[0m - No database connection');
}

// Init routes
server.get('/', (req, res) => {
  res.sendStatus(200);
});

server.use('/api/movie', movieRoutes);
server.use('/api/genre', genreRoutes);
server.use('/api/user/register', registerRoutes);
server.use('/api/user/login', loginRoutes);
server.use('/api/user/verify', verifyRoutes);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(
    '\x1b[36minfo',
    `\x1b[0m - Ready on http://localhost:${port} in ${
      dev ? 'development' : 'production'
    } mode`
  );
});
