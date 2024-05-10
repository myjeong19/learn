// * Redux

/**
 * * 이 코드에서 프로젝트 규모가 커지면, 발생할 수 있는 문제에 대해 생각해보자.
 * * 1. 액션 타입에서 오타를 내서, 문제가 생길 수 있다.
 * *    - 이를 방지하기 위해, 식별자를 상수로 정의하고, 그 상수를 사용하는 것이 좋다.
 * *    - 혹은, reducer를 작게 나누는 방법이 있다.
 * *    - 하지만, Redux toolkit을 사용하면, 이러한 방법을 사용하지 않고 해결할 수 있다.
 * * 2. 데이터 양이 많아질수록, 더 많은 상태를 복사해야하기에, 유지할수 없을 만큼 파일이 거대해질수도 있다.
 *  * *    -
 * * 3. 중첩된 데이터를 실수로 변경하며 상태의 변경에 영향을 줄 확률이 높아진다.
 */

/**
 */

import { createStore } from 'redux';

const initalState = { counter: 0, showCounter: true };
// * 가독성을 위해, 초기 상태를 상수에 정의한다.

// Counter Reducer
const counterReducer = (state = initalState, action) => {
  /**
   * * 왜 argument로 얻은 state를 반환하는 대신에 counter에 액세스하여 증가시키면 안되는가?
   * * 아래의 코드는 redux에서 절대 하면 안되는 코드이다.
  // if (action.type === 'increment') {
  //   return {
  //     state.counter++;
  //     return state
  //   };
  * * 기존의 state를 변형하기 때문이다.
  * * 절대 기존의 state를 변형해선 안된다.
  * * 또한 객체와 배열은 참조값이기에, 뜻하지 않게 기존의 state를 재정의하거나 변경하기 쉽다.
  * * 아래의 코드는 완전히 새로운 객체를 반환할 수 있지만, 여전히 기존의 state를 변형 시키는 좋지 않은 코드이다.
  * * 절대 기존의 state를 변형하지 말아야 한다.
  * * 기존의 state를 변형하게 되면, 예측 불가능한 동작을 발생 시키고, 디버깅을 어렵게 만든다.
  * * 그러므로, 항상 새로운 객체에 새로운 값을 생성해야한다.
  // if (action.type === 'increment') {
  //   return {
  //     counter: state.counter ;
  //     showCounter: state.showCounter;
  //   };
  * 
  */

  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
      // * 전체 객체를 반환하기 때문에, showCounter를 명시적으로 반환해야한다.
      // * 리덕스는 변화된 걸 합치지 않는 대신, 리턴한걸 바라보고, 그리고 기존의 것을 대체한다.

      // * showCounter를 설정하지 않으면, 기존의 showCounter가 사라지고, undefined가 되며,
      // * undefined는 false로 간주되기 때문에, increment와 increase를 실행하면, counter가 사라지게 된다.
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};

export const store = createStore(counterReducer);

/**
 * * Redux가 기존의 state를 대체하는데 사용하는 완전히 새로운 객체인 새 snapshot을 반환해야 한다.
 * * 따라서, reducer에서 반환하는 객체는 중요하지 않다.
 * * 중요한 것은, 기존의 state와 병합되지 않고, 기존 state를 덮어쓴다는 것이다.
 * * 그렇게 때문에 항상 다른 state를 설정해야 한다.
 */
