function putTokenInReq(req, _, next) {
  const auth = req.get('authorization');
  let token = '';

  if (auth?.toLowerCase().startsWith('bearer ')) {
    token = auth.substring(7);
  }

  req.token = token;

  next();
}

module.exports = {
  putTokenInReq
};
