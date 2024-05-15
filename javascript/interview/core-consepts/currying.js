// Karen은 JavaScript에서 기능을 수행할 수 있는 특별한 가능성이다.

// const multiply = num1 => {
//   return num2 => {
//     return num1 * num2;
//   };
// };

// const multiply = num1 => num2 => num1 * num2;

// console.log(multiply(2)(3)); // 6

// Create a curry function
// 항상 수행하려는 함수 내부를 전달해야한다.

const curry = function (fn) {
  var arity = fn.length;
  console.log('arity', arity);
  return function f1(...args) {
    if (args.length >= arity) {
      return fn(...args);
    } else {
      return function f2(...moreAgrgs) {
        var newArgs = args.concat(moreAgrgs);
        return f1(...newArgs);
      };
    }
  };
};

const curriedSum = curry((a, b, c) => a + b + c);
// console.log(curriedSum(1, 2, 3)); // 6
const partiallyCurriedSum = curriedSum(1);
console.log(partiallyCurriedSum(2, 3)); // 6
console.log(curriedSum(1)); // [Function: f2]
console.log(curriedSum(1)(2, 3)); // 6
console.log(curriedSum(1)(2)(3)); // 6

const get = curry((property, object) => object[property]);
console.log(get('id', { id: 1 }));
console.log(get('id')); // [Function: f2]

const getId = get('id');
console.log(getId({ id: 1 })); // 1

const map = curry((fn, values) => values.map(fn));
console.log(map(getId, [{ id: 1 }])); // [ 1 ]

const getIds = map(getId);
console.log(getIds([{ id: 1 }]));

// 커링 함수는 JavaScript에서 함수를 부분 적용하여 인자를 나중에 받을 수 있게 해줍니다.
