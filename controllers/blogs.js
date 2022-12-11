const blogsRouter = require('express').Router();

const Blog = require('../models/blog');

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  blog ? res.json(blog) : res.send(404).end();
});

blogsRouter.post('/', async (req, res) => {
  const { body } = req;
  const { title, url, likes } = body;

  if (!title || !url) return res.status(400).send('title and url are required');

  if (likes === undefined) body.likes = 0;

  const blog = await new Blog(body).save();

  blog ? res.status(201).json(blog) : res.status(400).end();
});

blogsRouter.put('/:id', async (req, res) => {
  console.log(req.body);

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  });

  res.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

module.exports = blogsRouter;
