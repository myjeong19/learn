// Check taht with such name exists in array of objects

const users = [
  {
    id: 1,
    name: 'John',
    isActive: true,
  },
  {
    id: 2,
    name: 'Jane',
    isActive: true,
  },
  {
    id: 3,
    name: 'Bob',
    isActive: false,
  },
];

const isNameExists = (name, users) => users.som(({ name: userName }) => userName === name);
console.log(isNameExists('Jane', users)); // true
