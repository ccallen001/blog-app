const jwt = require('jsonwebtoken');

function getToken(req) {
  const auth = req.get('authorization');

  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    return auth.substring(7);
  }

  return '';
}

function validateToken(token) {
  if (!token) return false;

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) return false;

  return true;
}

const tokenErrorObj = { error: 'token missing or invalid' };

module.exports = { getToken, validateToken, tokenErrorObj };
