import { useSelector, useDispatch } from 'react-redux';
// * useSelector
// * 저장소가 관리하는 상태 부분을 자동으로 선택할 수 있어, useStore Hook보다 useSelector Hook이 사용하기 더 편하다.
// * Class Component를 사용하는 경우, connect() 함수를 사용할 수 있다.

import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  // * 실행할 수 있는 dispatch 함수를 리턴한다.

  const counter = useSelector(state => state.counter);
  // ! useSelector가 유용한 이유.
  // * 큰 애플리케이션에는 수 많은 다양한 프로퍼티와 중첩된 객체 배열이 있기에, 더 복잡한 상태를 갖게 된다.
  // * useSelector를 사용하면, 아주 작은 일부분만 쉽게 가져올 수 있다.
  // * useSelector의 함수는 react-redux에 의해 실행되며, 리덕스가 관리하는 상태를 받고, 추출하려는 상태 부분을 리턴한다.

  // ! useSelector를 사용하면, react-redux는 이 컴포넌트를 위해, redux 저장소를 자동으로 구독한다.
  // * 그렇기 때문에, redux 저장소에서 데이터가 변경 될 때 마다, 자동으로 업데이트 된다.

  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
