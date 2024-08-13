// Write a function which can concatenate 2 arrays

// function mergeArrays(arr1, arr2) {
//   arr1.push(...arr2);
//   return arr1;
// }

// function mergeArrays(arr1, arr2) {
//   return arr1.concat(...arr2);
// }

function mergeArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}

const arr1 = [1];
const arr2 = [2, 3];
const result = mergeArrays(arr1, arr2);
console.log(result, arr1, arr2); // [1, 2, 3] [1] [2, 3]
