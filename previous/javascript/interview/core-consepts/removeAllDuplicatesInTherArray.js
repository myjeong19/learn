// Remove all duplicates in ther array
// 중복을 제거하는 세 가지 방법

// 1.
// function uniqueArr(arr) {
//   return [...new Set(arr)];
// }

// set은 중복을 허용하지 않는다. 따라서 중복된 값이 제거된 배열을 반환한다.

// 2.
// function uniqueArr(arr) {
//   const result = [];
//   arr.forEach(item => {
//     if (!result.includes(item)) {
//       result.push(item);
//     }
//   });
//   return result;
// }

// 3.
// function uniqueArr(arr) {
//   return arr.reducer((acc, el) => (acc.includes(el) ? acc : [...acc, el]));
// }
