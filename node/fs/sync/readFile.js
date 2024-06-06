const fs = require('fs');
const readMarkdown = fs.readFileSync('./text.md', { encoding: 'utf8' });

console.log(readMarkdown);
