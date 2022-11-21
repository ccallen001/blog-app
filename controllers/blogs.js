const blogsRouter = require('express').Router();

const Blog = require('../models/blog');

blogsRouter.get('/', (_, res) =>
  Blog.find({}).then((blogs) => res.json(blogs))
);

blogsRouter.post('/', (req, res) => {
  new Blog(req.body)
    .save()
    .then((blog) => res.status(201).json(blog))
    .catch((err) => res.status(400).send(err));
});

module.exports = blogsRouter;
