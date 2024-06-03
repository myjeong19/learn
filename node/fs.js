const fs = require('fs');

fs.writeFile('example.txt', 'some text', err => {
  if (err) {
    console.log(err);
  }
});

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log('File Data: \n' + data);
});

fs.unlink('example.txt', err => {
  if (err) {
    console.log(err);
  }
  console.log('File Deleted');
});
