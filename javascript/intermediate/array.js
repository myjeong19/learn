// const numbers = [99, 5, 8, 16];

// // length (number of elements in the array)
// console.log(numbers.length); // 4

// // push()
// numbers.push(100);

// // includes()
// console.log(numbers.includes(100)); // true
// // return true if the array contains the specified element, otherwise false

// // forEach()
// const multiplyByI = (number, i) => console.log(number * i);
// numbers.forEach(multiplyByI);

// object in array

const data = [
  {
    name: 'John',
    age: 45,
  },
  {
    name: 'Emily',
    age: 28,
  },
  {
    name: 'Mike',
    age: 32,
  },
];

data.forEach(person => console.log(person.name));
