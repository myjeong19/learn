// What is React fragment
// Do you konw the short version?

// React 내부에서 DOM Node 없이, DOM Node를 렌더링하고 싶을 때 사용된다.

import React from 'react';

const users = [
  { id: 1, name: 'Robin' },
  { id: 2, name: 'Dennis' },
];

const WhatIsReactFragment = () => {
  return (
    <ul>
      <>Short version of fragment</>
      {users.map(({ name, id }) => (
        <React.Fragment key={id}>{name}</React.Fragment>
      ))}
    </ul>
  );
};

export default WhatIsReactFragment;

// 짧은 버전의 Fragment의 문제 두 가지
// 모든 편집기에서 지원되지 않는다.
// Key 속성을 사용할 수 없다.
