// Design a function which returns a fibonacci sequence value
// The Fibonacci sequence is the integer sequence where the first two terms are 0 and 1. After that, the next term is defined as the sum of the previous two terms. Hence, the nth term is the sum of (n-1)th term and (n-2)th term.
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144;

/**
 ** 피보나치 수열 값을 반환하는 함수를 설계하세요.
 ** 피보나치 수열은 첫 두 항이 0과 1인 정수 수열입니다. 그 후의 각 항은 이전 두 항의 합으로 정의됩니다. 따라서 n번째 항은 (n-1)번째 항과 (n-2)번째 항의 합입니다.
 ** 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144;
 */

const fibonacci = n => {
  if (n < 2) {
    return 1;
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
};
