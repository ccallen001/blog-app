require('dotenv').config();

const { MONGODB_URL, PORT } = process.env;

module.exports = {
  MONGODB_URL,
  PORT
};
