const fs = require('fs');

// fs.renameSync('./new_file.txt', './new_file_rename.txt');
fs.renameSync('./new_file_rename.txt', './new_dir/new_file_rename.txt');
