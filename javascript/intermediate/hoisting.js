// number = 10;
// var numbers;
// console.log(number);

logStuff(); // hello
function logStuff() {
  console.log('hello');
}

log(); // ReferenceError: Cannot access 'log' before initialization
const log = () => console.log('Hello');

number = 10;
let number;
console.log(number); // ReferenceError: Cannot access 'number' before initialization
