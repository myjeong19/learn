// 1. Create a es6 module with function getName, getSurname and default export getFullname
// 2. Create the same with commonJS module

// import getFullname, { getName, getSurName } from './es6.js';
const { getName, getSurName, getFullname } = require('./common');

console.log(getName('John'), getSurName('Doe'), getFullname('John', 'Doe'));
