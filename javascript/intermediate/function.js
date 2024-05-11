// // overview again
// function addNumbers() {
//   const newNumber = 100;
//   console.log(newNumber);
// }

// addNumbers();

// calling other functions in function body
// const logHello = () => {
//   console.log('Hello');
// };

// const addNumbers = () => {
//   const newNumber = 100;
//   console.log(newNumber);
//   logHello();
// };

// addNumbers();

// refeactoring

const logGreetings = () => {
  console.log('hello');
  console.log('hi');
  console.log('hi');
  console.log('hi');
  console.log('hi');
  console.log('hi');
  console.log('hi');
};

const doSomething = () => {
  console.log(43345);
  console.log(38498);
  logGreetings();
};

const logStuff = () => {
  console.log(true);
  console.log(false);
  console.log([1, 4, 5]);
  logGreetings();
};

// early return / stop function execution
const checkValidity = number => {
  if (number < 5) {
    console.log('Denied');
    return;
    // Stop function execution
  }

  console.log('Approved');
};
