const { MONGODB_URL } = require('./utils/config');

const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

const loginController = require('./controllers/login');
const usersController = require('./controllers/users');
const blogsController = require('./controllers/blogs');

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('\x1b[42m%s\x1b[0m', 'connected to mongodb'))
  .catch((err) =>
    console.error('\x1b[41m%s\x1b[0m', 'error connecting to mongodb', err)
  );

app.set('json spaces', 2);

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/api/login', loginController);
app.use('/api/users', usersController);
app.use('/api/blogs', blogsController);

module.exports = app;
