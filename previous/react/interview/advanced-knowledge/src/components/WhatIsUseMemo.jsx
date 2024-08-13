// What do you know about useMemo?
// useMemo는 렌더링 사이에 데이터를 캐시하여 의존성 배열의 값이 변경될 때만 해당 데이터를 다시 계산한다.
// useMemo는 성능을 최적화 할 수 있지만 모든 속성에 대해 사용하면 안되며,
// 자바스크립트처럼 실행 시간이 소요되므로 복잡한 데이터 및 계산이 많은 경우에만 사용해야한다.

import { useState, useMemo } from 'react';

const users = [
  { id: 1, name: 'Robin' },
  { id: 2, name: 'Dennis' },
  { id: 3, name: 'Morgan' },
];

const WhatIsUseMemo = () => {
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');

  const filteredUsers = useMemo(() => {
    console.log('filteredUsers recalculating');
    return users.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={() => setSearch(text)}>Search</button>
      {text} {search}
      <ul>
        {filteredUsers.map(({ id, name }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default WhatIsUseMemo;
