const Blog = require('../models/blog');
const initialBlogs = [
  {
    title: 'Blog 0',
    author: 'Author 0',
    url: 'https://www.blog-0.com',
    likes: 0
  },
  {
    title: 'Blog 1',
    author: 'Author 1',
    url: 'https://www.blog-1.com',
    likes: 1
  }
];

const User = require('../models/user');
const initialUsers = [
  { username: 'user_0', passwordHash: 'dummy0', name: 'User 0' },
  { username: 'user_1', passwordHash: 'dummy1', name: 'User 1' }
];

module.exports = {
  Blog,
  initialBlogs,
  User,
  initialUsers
};
