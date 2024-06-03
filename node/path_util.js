const path = require('path');
// console.log(path.basename(__filename)); // path.js
// console.log(path.join(__dirname, './path/file')); // /Users/jeongmin-yeong/learn/node/path/file

const util = require('util');
console.log(util.log(path.basename(__filename)));
