// Write an asynchronous function which executes callback after finishing it's asynchronous task
// What problem callbacks solve?

function callbackFunction(message) {
  console.log('callback', message);
}

// Callback은 외부에서 제공되는 함수로, 비동기가 완료된 후 호출된다.
function asyncFunction(callbackFunction) {
  setTimeout(() => callbackFunction('done'), 2000);
}

asyncFunction(callbackFunction);

// 1. Callback은 assume control 결과를 기다릴 수 있게 한다.
// 2. 비동기 기능 내부에서는 무엇을 하는지 알 수 없다.
