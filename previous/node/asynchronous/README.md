# Node.js 런타임, 이벤트 기반 및 비동기적 특성

## 런타임 (Runtime)

Node.js는 구글의 V8 JavaScript 엔진을 기반으로 한 서버 측 JavaScript 런타임이며,  
이 런타임 환경은 웹 브라우저 외부에서 JavaScript 코드를 실행할 수 있게 하여,  
 클라이언트 측에서 사용되는 동일한 언어로 서버 측 애플리케이션을 만들 수 있도록 한다.

## 이벤트 드리븐 (Embracing the Event-Driven Architecture)

Node.js 핵심은 non-blocking I/O 작업을 활용하는 이벤트 기반 아키텍처에 있어,  
하나의 작업이 완료될 때까지 기다리지 않고 동시에 많은 연결을 처리할 수 있다.

이러한 접근 방식은 애플리케이션의 효율성과 응답성을 크게 향상 시켜,
채팅, 온라인 게임, 협업툴과 같은, 실시간 애플리케이션에 이상적이다.

## 콜백으로 비동기 작업 수용하기

콜백은 Node.js 비동기 작업의 기본 요소로,
함수가 작업이 완료될 때까지 기다리지 않고 계속 처리할 수 있게 해준다.

```js
function fetchData(callback) {
  // 비동기 작업 시뮬레이션
  setTimeout(() => {
    const data = 'Async operation successful!';
    callback(data);
  }, 1000);
}

// 콜백 사용
fetchData(result => {
  console.log(result);
});
```

## 콜백지옥

프로젝트가 커지면서 중첩된 콜백은 악명 높은 "콜백 지옥"을 초래할 수 있다.

```js
readFile('file1.txt', (err, data1) => {
  if (err) throw err;
  readFile('file2.txt', (err, data2) => {
    if (err) throw err;
    // ... 계속 이어짐
  });
});
```

- Promise를 사용하면 이러한 콜백 지옥 문제를 해결할 수 있다.

  ```js
  function fetchData() {
    return new Promise((resolve, reject) => {
      // 비동기 작업 시뮬레이션
      setTimeout(() => {
        const data = 'Async operation successful!';
        resolve(data);
      }, 1000);
    });
  }

  // 프로미스 사용
  fetchData()
    .then(result => {
      console.log(result);
    })
    .catch(error => {
      console.error(error);
    });
  ```

- Async/Awiat을 사용하면, 비동기 코드를 더욱 명확하게 만들 수 있다.

  ```js
  async function fetchData() {
    try {
      const data = await asynchronousOperation();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  ```

### 콜백, Promise 및 Async/Await를 사용하는 이유

1. 확장성 - non-blocking 특성은 확장성을 향상시켜 많은 연결을 동시에 처리할 수 있게한다.

2. 효율성 - 비동기 작업은 최적의 프로그램 흐름을 보장해, 전체 애플리케이션의 효율성을 높일수 있다.

3. 가독성과 유지보수성
