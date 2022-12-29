const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const { User, initialUsers } = require('./test-helper');

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(initialUsers);
});

describe('user CRUD', () => {
  test('the api returns users', async () => {
    const response = await api.get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(initialUsers.length);
  });

  test('a user can be added to the database', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'another_user',
        password: 'dummy3',
        name: 'Another User'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(initialUsers.length + 1);
  });
});

describe('user validation', () => {
  test('if username is less than 3 char, 400 is returned', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'an',
        password: 'dummy3',
        name: 'Another User'
      })
      .expect(400);
  });

  test('if name is less than 3 char, 400 is returned', async () => {
    await api
      .post('/api/users')
      .send({
        username: 'another_user',
        password: 'dummy3',
        name: 'An'
      })
      .expect(400);
  });
});

afterAll(() => mongoose.connection.close());
