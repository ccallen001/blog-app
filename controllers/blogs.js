const blogsRouter = require('express').Router();

const Blog = require('../models/blog');

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.post('/', async (req, res) => {
  const { body } = req;
  const { title, url, likes } = body;

  if (!title || !url) return res.status(400).send();

  if (likes === undefined) body.likes = 0;

  const blog = await new Blog(body).save();

  blog ? res.status(201).json(blog) : res.status(400).send();
});

module.exports = blogsRouter;
