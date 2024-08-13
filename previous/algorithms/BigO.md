# Big O

## 시간 복잡도 (Time Complexity)와 공간 복잡도 (Space Complexity)

- 시간 복잡도

  - 시간으로 측정할 시, 컴퓨터 환경에 영향을 받을 수 있어,
    시간복잡도를 시간으로 측정하지 않고, 작업 횟수를 측정한다.

- 공간 복잡도
  - 공간 복잡도는 메모리의 사용량을 측정한다.

## 최악의 상황 Big O (Worst Case)

- 1부터 7까지 숫자가 들어있는 배열이 있고, 특정 숫자를 찾을 때 까지 배열을 순회하는 for 루프를 구축한다고 가정해보자.

  - 1을 찾고 있는 경우, 최소한의 반복을 통해 나오는 최상의 경우이다.
    하지만 7을 찾는 경우 7번의 반복을 통해 나오는 최악의 경우가 된다.

  - 최상의 경우 Ω로 표시된다.
    평균의 경우 Θ, 최악의 경우 O로 표시된다.
    따라서, Big O는 항상 최악의 경우가 된다.

## O(n)

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

- 이 때, for 루프는 n번 실행된다.
  이 처럼, n번 실행되는 것을 O(n)이라 한다.

  - O(n)은 항상 직선으로 진행된다.

  <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpArTX%2Fbtq7Ovsyt5u%2FdMi7GpI19uaF6xRgqK9US1%2Fimg.png' alt='O(n)' width='500'/>

## Drop Constants

- 상수 제거 (Drop Constants)는 Big O 표기법을 단순화하고 작업을 더 쉽게 만드는 방법 중 하나이다.

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
  for (let j = 0; j < n; j++) {
    console.log(j);
  }
}

logItems(3);
```

- 이 코드는 n + n = 2n 실행된다.
  따라서, O(2n)이라 말할 수 있다.
  하지만, 상수가 있으면 2n, 100n 상관 없이 O(n)으로 단순화 할 수 있으며,
  이를 Drop Constans라 한다.

## O(n^2)

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}

logItems(10);
```

- 이 경우 출력된 항목 수는 n \* n 혹은 n²로 표현할 수 있으며,
  이를 O(n²)으로 표기할 수 있다.

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcjXeW6%2Fbtq7Ov7cs62%2FANeGaG1ktmyQiPNC02daWK%2Fimg.png" alt="O(n²)" width='500'/>

- 동일한 작업을 수행하는 두 개의 코드가 하나는 O(n²)이고, 다른 하나는 O(n)인 경우,
  O(n) 코드가 더 적은 작업으로 작업을 완료하므로 더 좋은 코드이다.
  - 일반적으로 O(n) 코드보다 작업을 적게 수행하는 코드가 더 좋은 코드이다.

## 비우세 항목 (Drop Non Dominants)

- Drop Non Dominants는 Big O 표기법을 단순화하는 또 다른 방법이다.

```js
function logItems(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
  for (let k = 0; k < n; k++) {
    console.log(i, k);
  }
}

logItems(10);
```

- 이 코드는 O(n²) 과 O(n)번 실행되었다.  
  이 둘을 합치면 O(n²+n)이 된다. 이 때, n이 100이라고 가정하면,  
  n²은 10,000이 되며, 추가된 단일 끝은 100이 더 많지만, 실제로 작업 수에는 영향을 미치지 않으며,
  n²의 증가속도가 n의 증가속도 보다 빠르기 때문에,
  n²은 지배적인 항, n 자체는 비지배적인 항으로 간주되어, 비지배적인 항인 n을 제거해  
  O(n²)으로 표기할 수 있다.

## 상수시간 (constant time) O(1)

```js
function addItems(n) {
  return n + n;
}
```

- 이 코드는 n의 크기와 상관 없이 연산의 수가 1이기에, O(1)로 표기할 수 있다.

```js
function addItems(n) {
  return n + n + n;
}
```

- 하지만, 또 값을 추가하면 이 코드의 시간복잡도는 O(2)가 된다.
  n과 관계 없이, 연산 횟수가 일정한 경우 이를 단순화하해 O(1)로 표기할 수 있다.

- O(1)은 가장 효율적인 Big O 표기법이다.

<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcyiy69%2Fbtq7KlRN3lz%2FiGqfMmVFG12yIgrXkTE5nK%2Fimg.png' alt='O(1)' width=500/>

## O(log n)

- 1부터 8까지 숫자가 정렬된 배열을 생각해보자.
  이 배열에서 효율적으로 숫자를 찾고 싶은 경우,
  원하는 숫자가 나올 때 까지 배열을 절반으로 나누는 작업을 반복할 수 있다.
  이를 분할 정복(Divide-and-conquer)이라하며, 이 배열에서의 연산 횟수는 3이다.
  이를 2³ = 8로 표현할 수 있다. 이를 로그로 변환하면, log₂8 = 3 이다.

  <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FMgGjf%2Fbtq7RK9SZmZ%2FHmy6F20We1kM233D3NmPu1%2Fimg.png' alt="O(log n)" width=500/>

  - O(1)만큼 평평하지 않지만, O(n) 및 O(n²)에 비해 매우 평평하고 매우 효율적이다.

- O(nlog n)

    <img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlCfnh%2Fbtq7L0s6IbJ%2F56Q0glAKnsN8VYpOG5bqvk%2Fimg.png' alt='O(nlog n)' width=500/>

  - O(nlog n)은 일부 정렬 알고리즘 사용되며, 숫자만 정렬하는 것이 아닌 이상, 정렬 알고리즘을 만들 수 있는 가장 효율적인 방법이다.

## Different Terms for Inputs

```js
function logItems(a, b) {
  for (let i = 0; i < a; i++) {
    console.log(i);
  }
  for (let j = 0; j < b; j++) {
    console.log(j);
  }
}
```

- 두 반복문의 시간 복잡도는 O(n)이며, 이 둘을 합칠 때, 첫 번째 반복문은 a만큼, 두번째 반복문은 b만큼 실행되므로,
  O(a + b)으로 나타낼 수 있다.

```js
function logItems(a, b) {
  for (let i = 0; i < a; i++) {
    for (let j = 0; j < b; j++) {
      console.log(i, j);
    }
  }
}
```

- O(a \* b)

## Arrays Big O

- 배열 마지막 요소를 push 혹은 pop하는 경우,
  다시 색인화를 할 필요가 없으므로, 이 때 시간 복잡도는 O(1)이다.

- 배열의 첫 번째 요소를 shift 혹은, unshift 하는 경우, 다시 색인화를 하며,
  이 때 시간 복잡도는 O(n)이다.

  - splice 또한, 배열의 특정 위치에 요소를 추가하게 되므로 다시 색인화가 진행되어, O(n)의 시간 복잡도를 가진다.

    - O(1/2)n이 아닌 이유는 Big O가 항상 최악의 상황을 고려하며, 1/2 또한 상수이기 때문이다.

    - 배열의 인덱스를 사용할 경우, 단일 작업으로 메모리의 해당 위치에 직접 이동할 수 있어 O(1)의 시간 복잡도를 가진다.
      - 배열은 인덱스를 사용해 빠르게 항목을 찾을 수 있지만, 추가 및 제거와 같은 작업에선 색인화가 발생하기에, 비효율적이다.
