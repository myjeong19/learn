const OBJECT = 'object';
const ARRAY = 'array';

// Design a shallow comparison function

const typeOf = input => {
  const rawObject = Object.prototype.toString.call(input).toLowerCase();
  const typeOfRegex = /\[object (.*)]/g;
  const type = typeOfRegex.exec(rawObject)[1];
  return type;
};

const shallowCompare = (source, target) => {
  if (typeOf(source) !== typeOf(target)) {
    return false;
  }

  if (typeOf(source) === ARRAY) {
    if (source.length !== target.length) {
      return false;
    }

    return source.every((el, index) => el === target[index]);
  }

  if (typeOf(source) === OBJECT) {
    if (Object.keys(source).length !== Object.keys(target).length) {
      return false;
    }
    return Object.keys(source).every(key => source[key] === target[key]);
  }

  if (typeOf(source) === 'data') {
    return source.getTime() === target.getTime();
  }

  return source === target;
};

console.log(shallowCompare([1], [1])); // true
console.log(shallowCompare({ a: 1 }, { a: 1 })); // true
