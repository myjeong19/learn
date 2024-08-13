const fs = require('fs');

fs.rmdir('./new_dir', err => {
  if (err) throw err;
});
