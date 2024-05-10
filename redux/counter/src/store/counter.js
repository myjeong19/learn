import { createSlice } from '@reduxjs/toolkit';

const initialCounterState = { counter: 0, showCounter: true };

// * cereateSlicesms 서로 다른 reducer에 해당하는, 고유 액션 식별자를 자동으로 생성한다.
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,

  // * slice는 reducer를 필요로 한다.
  // * 모든 메서드는, 자동으로 최근 값을 받으며, Redux에 의해 호출된다.
  // * 메서드는 자동으로 호출되기에, 별도의 action이 필요 없다.
  reducers: {
    increment(state) {
      state.counter++;
      // * Redux toolkit은 내부적으로 immer 패키지를 사용하기에,
      // * 이러한 코드를 감지하고, 자동으로 원래 있는 상태를 복제한다.
      // * 그리고 새로운 상태 객체를 생성하고, 모든 상태를 변경할 수 없게 유지하고,
      // * 변경한 상태는 변하지 않도록 덮어쓴다.
      // * 즉 내부적으로, 변경할 수 없는 코드가 있기에 위의 코드가 가능해진다.
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // * Redux toolkit을 사용해도, 액션을 listen하는, 리듀서를 가질 수 있다.
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// * action 식별자 값
// * counterSlice.actions는 key로 가득한 객체를 반환한다.
// * Redux toolkit에 의해 자동으로 생성된 메서드가 생기고
// * 해당 메서드가 호출되면 액션 객체가 생성된다.
// * 그러므로, 이러한 메서드를 액션 생성자라고 부른다.
// * action 객체는 type을 가지고 있다.
export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
