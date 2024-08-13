const fs = require('fs');

fs.writeFile('new_file.txt', 'example text', { flag: 'a+' }, err => {
  if (err) throw err;
});
