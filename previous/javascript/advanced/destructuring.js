// Object Destructuring

const user = {
  name: 'John',
};

const { name } = user;
console.log(name); // John

const numbers = [1, , 2, 3];

const [a] = numbers;
console.log(a); // 1
