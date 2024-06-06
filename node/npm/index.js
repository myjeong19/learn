const _ = require('lodash');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 10];

const sortedNumbers = _.sortBy(numbers);

console.log(sortedNumbers);
