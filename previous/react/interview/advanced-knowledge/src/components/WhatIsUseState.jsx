import { useState } from 'react';

// const WhatIsUseState = () => {
//   let count = 0;
//   const result = useState('');
//   console.log(result); // ['', ƒ]
//   // value, setter function

//   const onClick = value => {
//     console.log('onButtonClick in parent', value);
//     count++;
//   };

//   return (
//     <div>
//       <p>{count}</p>
//       <button onClick={onClick}>Hello</button>
//     </div>
//   );
// };

// export default WhatIsUseState;

// useState가 필요한 이유
// 첫 번째 렌더링 동안 컴포넌트 내부에 존재하는 모든 라인과 변수는 스냅샷일 뿐이고,
// 모든 함수와 변수는 매 렌더링마다 다시 생성되며, 두 렌더링 사이 일부 값을 저장하는 방법은 없다.

const WhatIsUseState = () => {
  const [count, setCount] = useState(0);
  console.log(count);

  // 버튼을 클릭하면 카운터가 증가하고 렌더링 사이에 값이 저장되며, Component가 state를 변경할 때마다 다시 렌더링된다.
  const onClick = value => {
    console.log('onButtonClick in parent', value);
    // setCount(count + 1);
    // setCount(count + 1);
    // 실제 값이 다음 렌더링에서만 변경되기에,
    // setCount는 이전의 값이 아닌 현재의 값에 의존해서 값을 변경하기에,
    // setCount를 두번 호출해도 값은 1만 증가하게 된다.
    // 대신 값을 늘리기 위해서는, 이전 값에 접근해야한다.
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    // 함수를 제공하면, 이전 값에 접근할 수 있다.
  };

  //   객체로 묶어서 관리하면, 상태를 업데이트하는 것이 복잡해지므로,개별적으로 분류하는 것이 좋다.
  //   const [data, setData] = useState({
  //     isLoadding: false,
  //     count: 0,
  //     users: [],
  //   });
  const [isLoadding, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Component 내부에 Hook을 중첩할 수 없다.
  //   if (true) {
  //     const [count, setCount] = useState(0);
  //     console.log(count);
  //   }
  //   state는 조건부로 호출되며, Hook은 모든 Components에서 정확히 동일한 순서로 호출되어야 하므로, 조건부, 루프, 중첩 함수 내부에서 호출할 수 없다.

  // state의 기본 값은 한번만 설정할 수 있으며,
  // state의 기본 값으로 함수를 제공하는 경우, 함수는 렌더링마다 호출되지 않고, 단 한 번만 실행된다.
  const [getUsers, setGetUsers] = useState(() => {
    console.log('check our function');
    const usersLS = localStorage.getItem('users');
    return usersLS ? JSON.parse(usersLS) : [];
  });

  return (
    <div>
      <p>
        {count} <button onClick={onClick}>Hello</button>
      </p>
    </div>
  );
};

export default WhatIsUseState;
