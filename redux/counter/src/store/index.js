//* Redux Toolkit

import { configureStore } from '@reduxjs/toolkit';
// * createSlice 혹은, createReducer를 사용할 수 있다.
// * 하지만, createReducer보다, createClice가 더 강력하며, 몇 가지를 단순화 할 수 있다.

import counterReducer from './counter';
import authRedcuer from './auth';

/**
 * * createSlice는 객체를 인자로서 생성하며,
 * * 서로 직접적인 관계가 아닌 경우, 전역 상태의 slice를 미리 생성해둬야 한다.
 */

/**
 * * createStore에는 하나의 reducer만 전달해야하기 때문에, slice가 많아지면 문제가 생길 수 있다.
 * * 여러개의 reducer를 하나의 reducer로 합칠 수 있는 configureStore를 사용하면, 이러한 문제를 해결할 수 있다.
 */
const store = configureStore({
  // reducer: counterSlice.reducer,
  reducer: {
    counter: counterReducer,
    auth: authRedcuer,
  },
});

export default store;
