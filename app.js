const { MONGODB_URL } = require('./utils/config');

const express = require('express');
const app = express();

require('mongoose')
  .connect(MONGODB_URL)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.error('error connecting to mongodb', err));

app.set('json spaces', 2);

app.use(require('cors')());
app.use(express.json());

app.use('/api/blogs', require('./controllers/blogs'));

module.exports = app;
