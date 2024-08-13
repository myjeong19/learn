// what do you know about useCallback?
// useCallback은 함수 호출을, useMemo는 데이터를 캐시하는데 사용된다.
// useCallback 훅을 사용하지 않으면 자식 컴포넌트가 불필요하게 다시 렌더된다.

import { useState, useCallback, memo } from 'react';

const initialUsers = [
  { id: 1, name: 'Robin' },
  { id: 2, name: 'Dennis' },
  { id: 3, name: 'Morgan' },
];

const List = memo(({ users, onRemove }) => {
  console.log('list render');
  return (
    <ul>
      {users.map(({ id, name }) => (
        <li key={id}>
          {name}
          <span onClick={() => onRemove(id)}></span>
        </li>
      ))}
    </ul>
  );
});

const WhatIsUseCallback = () => {
  console.log('render');
  const [users, setUsers] = useState(initialUsers);
  const [text, setText] = useState('');

  const handleRemove = useCallback(
    id => {
      const updateUsers = users.filter(user => user.id !== id);
      setUsers(updateUsers);
    },
    [users]
  );

  return (
    <>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <List users={users} onRemove={handleRemove} />
    </>
  );
};

export default WhatIsUseCallback;
