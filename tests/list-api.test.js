const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { Blog, initialBlogs } = require('./test-helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const initialBlog of initialBlogs) {
    await new Blog(initialBlog).save();
  }
});

test('blogs are returned as json', async () =>
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/));

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map((blog) => blog.title);

  expect(titles).toContain(initialBlogs[1].title);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'New Blog Author',
    url: 'https://www.new-blog.com',
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');

  const titles = response.body.map((resp) => resp.title);

  expect(response.body).toHaveLength(initialBlogs.length + 1);

  expect(titles).toContain(newBlog.title);
});

test("unique identifier '_id' is transformed to 'id' in Schema and is defined in response", async () => {
  const { body } = await api.get('/api/blogs');

  expect(body.length).toEqual(initialBlogs.length);

  for (blog of body) {
    expect(blog.id).toBeDefined();
  }
});

test('if likes are missing, likes default to 0', async () => {
  const newBlog = {
    title: 'Missing Likes',
    author: 'A Guy Without Likes',
    url: 'likes@undefined.com'
  };

  const { body } = await api.post('/api/blogs').send(newBlog);

  expect(body.likes).toEqual(0);
});

test('if title or url are missing, response is 400', async () => {
  const newBlog = {
    author: 'A Guy With No Name',
    likes: 10
  };

  await api.post('/api/blogs').send(newBlog).expect(400);
});

afterAll(() => mongoose.connection.close());
