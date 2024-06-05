const fs = require('fs');

const logMessage = message => {
  fs.appendFile('app.log', message + '\n', err => {
    if (err) {
      console.log('Error writing to log file', err);
    } else {
      console.log('Message logged', message);
    }
  });
};

// default export
module.exports = logMessage;
module.exports.config = {
  logFileName: 'app.log',
  logDirectory: './',
};
