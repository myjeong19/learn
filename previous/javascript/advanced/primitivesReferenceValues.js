// primitives vs reference values

console.log(5 === 5); // true
console.log('hi' === 'hi'); // true

console.log([] === []); // false

const numbers1 = [1, 2];
const numbers2 = [1, 2];
console.log(numbers1 === numbers2); // false

const numbers3 = numbers1;
console.log(numbers1 === numbers3); // true
