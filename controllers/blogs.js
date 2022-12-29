const blogsRouter = require('express').Router();

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (_, res) => {
  const blogs = await Blog.find({}).populate('user', {
    id: 1,
    username: 1,
    name: 1
  });
  res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  blog ? res.json(blog) : res.send(404).end();
});

blogsRouter.post('/', async (req, res) => {
  const { body } = req;
  let { title, author, url, likes, userId } = body;

  if (!title || !url) return res.status(400).send('title and url are required');

  if (likes === undefined) likes = 0;

  const user = await User.findById(userId);

  const blog = await new Blog({
    title,
    author,
    url,
    likes,
    user: user?.id
  }).save();

  if (user) {
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
  }

  blog ? res.status(201).json(blog) : res.status(400).end();
});

blogsRouter.put('/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: 'query'
  });

  res.json(updatedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const blog = await Blog.findById(id);

  await Blog.findByIdAndRemove(id);

  const user = await User.findById(blog.user.id);
  user.blogs = user.blogs.filter((blog) => blog.id !== id);
  await user.save();

  response.status(204).end();
});

module.exports = blogsRouter;
