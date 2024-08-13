const user = {
  name: 'John',
  age: 45,
};

console.log(user.name); // John
console.log(user['name']); // John

user.name = 'Emily';
console.log(user.name); // Emily

const numbers = [5, 10, 15];
numbers[1] = 999;

console.log(numbers); // [5, 999, 15]
