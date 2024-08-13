// What do you konw about useEffect?

import { useEffect, useState } from 'react';

// const WhatIsUseEffect = () => {
//   const [count, setCount] = useState(0);

//   const changeTitle = () => setCount(count + 1);

//   console.log('render');
// //   useEffect(() => console.log('useEffect triggered'), []);
//   //   useEffect는 컴포넌트가 렌더링된 후에 항상 트리거된다.
//   //   처음 한번만 트리거 되는 이유는, 초기화시 트리거 되는 것이 아닌 의존성이 없기 때문이다.

//   //   useEffect는 side effect를 일으키기 위해 필요하다.
//   useEffect(() => {
//     document.title = `You clicked ${count} times`;
//   }, [count]);

//   return <button onClick={changeTitle}>Change Title</button>;
// };

// export default WhatIsUseEffect;

const WhatIsUseEffect = () => {
  const [articles, setArticles] = useState([]);
  console.log('render');

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch('http://localhost:5317/articles');
      const data = await response.json();
      setArticles(data);
    };

    getArticles();
  }, []);

  return (
    <ul>
      {articles.map(({ id, title }) => (
        <li key={id}>{title}</li>
      ))}
    </ul>
  );
};

export default WhatIsUseEffect;
