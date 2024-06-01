// What do you know about useRef?

// 일반적으로 useRef를 사용하는 두 가지 이유
// 1. 렌더링 사이, 변경 가능한 값을 저장
// 2. DOM요소에 접근

import { useRef } from 'react';

export const WhatIsUseRef = () => {
  console.log('render');
  // 단지 DOM을 조작하기에, 리렌더링이 발생하지 않는다.

  const refInput = useRef(null);

  const onTextFocus = () => {
    console.log(refInput); // {current: input}
    console.log(refInput.current.value); // input value
    refInput.current.focus();
    refInput.current.value = 'Hello, useRef';
  };

  //   useRef는 React 밖에서 DOM을 조작하기에, input에 사용하는 것은 좋은 접근 방식이 아닐수도 있다.

  return (
    <div>
      <input type="text" ref={refInput} />
      <button onClick={onTextFocus}>Focus on the input pls</button>
    </div>
  );
};
