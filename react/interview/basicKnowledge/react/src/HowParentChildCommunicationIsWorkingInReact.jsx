// How parent and child component can communicate in React?
// Can we mutate props

export const Button = ({ text = 'Not set', onClick }) => {
  const handleButton = () => onClick('hello');

  return <button onClick={handleButton}>{text}</button>;
};

const HowParentChildCommunicationIsWorkingInReact = () => {
  const onClick = value => {
    console.log(value);
  };

  return (
    <div>
      <Button text="Hi React" onClick={onClick}></Button>
      <Button></Button>
    </div>
  );
};

export default HowParentChildCommunicationIsWorkingInReact;

// parent component에서 props를 통해 자식 컴포넌트에 데이터를 전달할 수 있지만, 반대 방향으로 전달할 순 없다. 또한, 해당 props는 읽기 전용이다.

// props는 React내부에서만 읽기 때문에, 실제로 변경할 수 없다.

// React 내에서 부모 자식 통신을 구현하기 위해 props만 사용한다.
// props는 위에서 아래로 이동하며, 읽기 전용이다.
