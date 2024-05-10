const redux = require('redux');

/**
 ** 2 prameters
 ** 1. 기존 상태
 ** 2. 발송된 Action
 ** 항상 새로운 상태 객체를 리턴해야만 하므로, 순수 함수여야 한다.
 */

/**
 ** TypeError: Cannot read properties of undefined (reading 'counter')가 발생한 이유.
 ** 첫 실행에 기본 값이 없어서 발생함.
 ** state = { counter: 0 }으로 기본 값을 설정해주면 해결 됨.
 */

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state;

  //*  이론적으로는 어떠한 값 유형도 될 수 있다.
};

const store = redux.createStore(counterReducer);
// reducer Function in Parameter

// 발송할 수 있는 Action

// 구독 (Subscribe)
const counterSubscriber = () => {
  //   createStore()로 생성된 저장소에서 사용할 수 있는 메서드 getState()
  const latestState = store.getState();
  //   초기 상태를 받을 수 있다.
  console.log(latestState);
};

store.subscribe(counterSubscriber);
// redux는 Data와 Storage가 변경될 때마다, counterSubscriber를 호출한다.

// Action 선언과 발송
// dispatch는 Action을 발송하는 메소드이다.
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });
