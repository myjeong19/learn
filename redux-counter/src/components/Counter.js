import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store';
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();

  const counter = useSelector(state => state.counter);

  const show = useSelector(state => state.showCounter);

  const incrementHandler = () => dispatch(counterActions.increment());

  // * payload가 필요한 경우
  // * 자동으로 생성된 액션 생성자 메소드를 사용하면, payload를 전달할 수 있다.
  // * 그렇다면 값을 어떻게 추출할 수 있을까?
  // * Redux Toolkit은 자동으로 액션 생성자를 생성해서,
  // ! {type: SOME_UNIQUE_IDENTIFIER, payload: value}
  // * Redux Toolkit이 생성한 {type: SOME_UNIQUE_IDENTIFIER}를 전달하고,
  // * 인자로서 실행하고자 하는 값을 추가 필드명이 payload인 곳에 저장한다.
  const handleIncrease = () => dispatch(counterActions.increase(5));

  const decrementHandler = () => dispatch(counterActions.decrement());

  const toggleCounterHandler = () => dispatch(counterActions.toggleCounter());

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}

      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={handleIncrease}>increment by 5</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>

      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
