// Write a function which get's an array and an element and returns a array with this element at the end

// this is typically good example of bad code in the application
// const numbers = [1, 2];

// const append = (array, element) => {
//   array.push(element);
//   return array;
// };

// const newNumber = append(numbers, 3);
// console.log(newNumber);
// console.log(numbers);

// sfae, pure function
const numbers = [1, 2];

const append = (array, element) => {
  return [...array, element];
};

const newNumber = append(numbers, 3);
console.log(newNumber);
console.log(numbers);
