const fs = require('fs');

const readStream = fs.createReadStream('./text.md', 'utf-8');
const writeStream = fs.createWriteStream('./text_copy.md', 'utf-8');

// readStream.on('data', chunk => writeStream.write(chunk));

// readStream.on('end', () => writeStream.end());

// or

readStream.pipe(writeStream).on('error', err => console.log(err));

writeStream.on('close', () => process.stdout.write('file copied'));
