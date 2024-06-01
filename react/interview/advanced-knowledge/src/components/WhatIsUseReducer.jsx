// What do you know about useReducer?

// 합리적인 사용시기는 언제인가?
// state는 3~5개의 서로 다른 속성이 있는 경우 합리적이다.
// 하지만 10~30개인 경우 useReducer를 사용하는 것이 더 좋다.

// 사용시 이점
// useReducer를 사용하면 복잡한 컴포넌트의 state를 조직화할 수 있다.
// 초기 상태(initial state)는 컴포넌트 외부에 선언하여 비즈니스 로직의 양을 줄일 수 있다.
// 리듀서는 action의 타입에 따라 state를 업데이트한다.

// 사용시 주의사항
// state를 변경할 때는 기존 state를 직접 수정하지 않고 새로운 객체를 반환해야 한다.
import { useEffect, useReducer } from 'react';

const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const reducer = (state, { type, payload }) => {
  console.log('reducer', state, type, payload);

  const actions = {
    getArticlesStart: () => ({ ...state, isLoading: true }),
    getArticlesSuccess: () => ({ ...state, isLoading: false, data: payload }),
  };

  return actions[type](payload) ?? state;
};

export const WhatIsUseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log('state', state);

  useEffect(() => {
    dispatch({ type: 'getArticlesStart' });
    const getArticles = async () => {
      const response = await fetch('http://localhost:5317/articles');
      const data = await response.json();
      dispatch({ type: 'getArticlesSuccess', payload: data });
    };

    getArticles();
  }, []);

  return (
    <ul>
      {state.data?.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};
