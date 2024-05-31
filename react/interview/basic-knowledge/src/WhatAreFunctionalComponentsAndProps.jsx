// Question.
// How to create functional components
// How to pass props to the components

// 함수형 컴포넌트는 React에서 중요한 역할을 하는데, 상태(state)를 가지지 않고 매번 렌더링될 때마다 다시 생성된다.
// props는 부모 컴포넌트로부터 정보를 전달받는 용도로 사용되며, 기본값을 설정할 수도 있다.

export const Button = ({ text = 'Not set' }) => <button>{text}</button>;

const WhatAreFunctionalComponentsAndProps = () => (
  <div>
    <Button text="Hi React"></Button>
    <Button></Button>
  </div>
);

export default WhatAreFunctionalComponentsAndProps;
