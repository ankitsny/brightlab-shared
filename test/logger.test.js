const logger = require('../logger')({ logLevel: 'debug', logRotateDuration: '10s' });


let count = 30;
const x = setInterval(() => {
  logger.error('error 1:', count);
  count -= 1;
  if (!count) {
    clearInterval(x);
    logger.debug('EXITING');
  }
}, 1000);
