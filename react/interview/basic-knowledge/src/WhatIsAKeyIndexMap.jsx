// Qusetion
// How to render a list inside React?
// What is key and why it is bad to use index for it

const users = [
  { id: 1, name: 'Robin' },
  { id: 2, name: 'Dennis' },
];

const WhatIsAKeyIndexMap = () => {
  return (
    <ul>
      {users.map(({ name, id }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default WhatIsAKeyIndexMap;

// Key는 무엇이며, 인덱스를 사용하는 이유는 무엇인가?
// React가 배열을 이해하고 효율적으로 렌더링하기 위해서는, Key 속성을 제공해야한다.
// 일반적으로 index로 key값을 얻기 쉬워 사용할 수 있지만, 이는 추천되지 않지만, 배열을 변경하지 않는 경우, 사용해도 괜찮다.
// index를 사용하면, 잘못된 요소에 액세스 할 수 있기에, 오류가 발생할 수 있다.
