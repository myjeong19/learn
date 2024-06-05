const logger = require('./logger');

const { config } = require('./logger');

logger('this is a log message from main.js file');

console.log('Log file name:', logger.config.logFileName);
console.log('Log directory:', config.logDirectory);
