require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');

const port = process.env.PORT;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
});

const Blog = mongoose.model('Blog', blogSchema);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.error('error connecting to mongodb', err));

app.set('json spaces', 2);

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (_, res) =>
  Blog.find({}).then((blogs) => res.json(blogs))
);

app.post('/api/blogs', (req, res) => {
  new Blog(req.body)
    .save()
    .then((blog) => res.status(201).json(blog))
    .catch((err) => res.status(400).send(err));
});

app.listen(port, () => console.log(`listening on port ${port}`));
