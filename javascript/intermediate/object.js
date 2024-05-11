// // object in object
// const user = {
//   name: 'Emily',
//   age: 30,
//   hobbies: ['reading', 'music', 'coding'],
//   address: {
//     city: 'New York',
//     street: '5th Avenue',
//   },
// };

// console.log(user.address.city); // New York

// property name is somtimes same as property value

// const { username, password } = input;
// const newUser = { username, password };

// passing object as argument to function

const user = {
  name: 'Emily',
  age: 30,
};

function logUser({ name, age }) {
  console.log(name);
  console.log(age);
}

logUser(user);
