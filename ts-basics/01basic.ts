// function jsAdd(n1, n2) {
//   return n1 + n2;
// }

// const jsNumber1 = "5";
// const jsNumber2 = 2.8;

// const jsResult = jsAdd(jsNumber1, jsNumber2);
// console.log(jsResult); // 52.8
// *  Argument of type 'string' is not assignable to parameter of type 'number'.

function tsAdd(n1: number, n2: number) {
  return n1 + n2;
}

const tsNumber1 = 5;
const tsNumber2 = 2.8;

const tsResult = tsAdd(tsNumber1, tsNumber2);
console.log(tsResult); // 7.8
