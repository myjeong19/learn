// Find the number of occurences of minimum value in the list
// 목록에서 최소 값의 발생 횟수 찾기
const arr = [1, 2, 3, 1];
const minValue = Math.min(...arr);
const minArr = arr.filter(item => item === minValue);
console.log(minArr.length); // 2
