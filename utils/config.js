require('dotenv').config();

const env = process.env;

module.exports = {
  MONGODB_URL:
    env.NODE_ENV === 'test'
      ? env.TEST_MONGODB_URL
      : env.MONGODB_URL,
  PORT: env.PORT
};
