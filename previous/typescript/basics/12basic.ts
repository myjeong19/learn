function add(a: number, b: number): number {
  return a + b;
}

function printResult(num: number): void {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

console.log(printResult(add(5, 12))); // undefined

// let combineValues;
// combineValues의 타입이 any로 추론되었기에 5가 할당된다.
// combineValues = 5;

// console.log(combineValues); // 5

// let combineValues: Function;
// combineValues = add;
// combineValues = printResult;

// console.log(combineValues(8, 8)); // undefined

let combineValues: (a: number, b: number) => number;
combineValues = add;
console.log(combineValues(8, 8)); // 16
