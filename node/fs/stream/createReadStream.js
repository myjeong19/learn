const fs = require('fs');

const stream = fs.createReadStream('./text.md', 'utf-8');

stream.on('data', chunk => {
  console.log(chunk);
});

stream.on('end', () => console.log('finished'));
