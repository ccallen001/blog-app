const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const blog = require('../models/blog');
const api = supertest(app);

const { Blog, initialBlogs } = require('./test-helper');

beforeEach(async () => {
  await Blog.deleteMany({});

  for (const initialBlog of initialBlogs) {
    await new Blog(initialBlog).save();
  }
});

describe('getting blogs', () => {
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
});

describe('posting a blog', () => {
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

    for (const blog of body) {
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
});

describe('updating (PUT) a blog', () => {
  test('a blog can be updated', async () => {
    const resp = await api.get('/api/blogs');

    const { id, ...blog } = resp.body[0];

    const updatedLikes = 10;

    await api
      .put(`/api/blogs/${id}`)
      .send({ ...blog, title: 'Updated', likes: updatedLikes });

    const updatedBlog = await Blog.findById(id);

    expect(updatedBlog.title).toEqual('Updated');

    expect(updatedBlog.likes).toEqual(updatedLikes);
  });
});

describe('deleting a blog', () => {
  test('a blog can be deleted', async () => {
    const blogs = await api.get('/api/blogs');

    const { id } = blogs.body[0];

    await api.delete(`/api/blogs/${id}`);

    const blogsOneLess = await api.get('/api/blogs');

    expect(blogsOneLess.body).toHaveLength(initialBlogs.length - 1);

    expect(blogsOneLess.body.map((blog) => blog.id)).not.toContain(id);
  });
});

afterAll(() => mongoose.connection.close());
