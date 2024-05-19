function doSomething() {}

const claculaterPrice = () => {};

// doSomething();
// claculaterPrice();

// callback functions
[5, 9, 10].some(() => {});

// method
const arr = [5, 9, 15];
arr.push();

const obj = {
  name: 'John',
  hobbies: ['golf', 'skiing'],
  //   calculateAge: () => 30 + hobbies.length, // ReferenceError: hobbies is not defined
  calculateAge: function () {
    return 30 + this.hobbies.length;
  },
};

console.log(obj.calculateAge()); // 32

// default parameters
const calculatePrice = (sqMeters = 10000) => 5000 + sqMeters;
const callCalculatePrice = calculatePrice();
console.log(callCalculatePrice); // 15000
