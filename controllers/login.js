const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const loginRouter = require('express').Router();
const User = require('../models/User');

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {}
});

module.exports = loginRouter;