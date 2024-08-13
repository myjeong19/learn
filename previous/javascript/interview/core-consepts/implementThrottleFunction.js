// Create throttle function

// 스로틀된 함수가 일정한 시간 간격으로만 호출되며,
// 로틀링은 네트워크 요청이나 사용자 입력과 같은 이벤트를 제어하는 데 유용하다.
function throttle(func, timeout = 300) {
  let isWaiting = false;
  return (...args) => {
    if (!isWaiting) {
      func.apply(this, args);
      isWaiting = true;
      setTimeout(() => (isWaiting = false), timeout);
    }
  };
}

function saveInput(name) {
  console.log('saveInput', name);
}

const processChange = throttle(saveInput, 2000);
processChange('foo');

setTimeout(() => processChange('foo'), 1000);
setTimeout(() => processChange('foo'), 1200);
setTimeout(() => processChange('foo'), 2400);
