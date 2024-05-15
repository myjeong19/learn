// Writing Range Function
// 범위를 구현하는 함수 작성

// 1.
// function range(start, end) {
//   const result = [];
//   for (let i = start; i <= end; i++) {
//     result.push(i);
//   }
//   return result;
// }

// console.log(range(1, 50));

// 2..........

function range(start, end) {
  return [...Array(end - start).keys()].map(el => el + start + 1);
}

console.log(range(0, 50));
