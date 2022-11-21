const { PORT } = require('./utils/config');

require('http')
  .createServer(require('./app'))
  .listen(PORT, () => console.log(`listening on port ${PORT}`));
