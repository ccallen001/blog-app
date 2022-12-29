const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

const checkUsernameUniqueness = async (username) =>
  !(await User.findOne({ username }));

usersRouter.get('/', async (_, res) => {
  const users = await User.find({}).populate('blogs', {
    id: 1,
    author: 1,
    title: 1,
    url: 1
  });
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).populate('blogs', {
    id: 1,
    author: 1,
    title: 1,
    url: 1
  });
  res.json(user);
});

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  if (username.length < 3 || name.length < 3) {
    return res.status(400).json({
      message: 'Username and password must be at least 3 characters long.'
    });
  }

  const usernameIsUnique = checkUsernameUniqueness(username);
  if (!usernameIsUnique) {
    return res.status(400).json({ error: 'username must be unique' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    passwordHash
  });

  const user = await newUser.save();

  res.status(201).json(user);
});

module.exports = usersRouter;
