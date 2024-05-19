const numbers = [10, 100, 500, 1000];

// push()

// forEach()

numbers.forEach(nr => console.log(nr + 10)); // 20, 110, 510, 1010

const nemNumbers = numbers.map(nr => nr * 2);
console.log(nemNumbers); // [20, 200, 1000, 2000]

// some()
const isOverNumber = numbers.some(number => number > 500);
console.log(isOverNumber); // true

const getOverNumber = numbers.find(number => number > 800);
console.log(getOverNumber); // 1000

const getOverNumbers = numbers.filter(number => number > 400);
console.log(getOverNumbers); // [500, 1000]
