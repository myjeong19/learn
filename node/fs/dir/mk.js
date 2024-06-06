const fs = require('fs');

if (fs.existsSync('./new_dir')) {
  console.log('Directory exists');
  return;
}

fs.mkdir('new_dir', err => {
  if (err) throw err;
});
