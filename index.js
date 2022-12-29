const { PORT } = require('./utils/config');

require('http')
  .createServer(require('./app'))
  .listen(PORT, () =>
    console.log('\x1b[42m%s\x1b[0m', `listening on port ${PORT}`)
  );
