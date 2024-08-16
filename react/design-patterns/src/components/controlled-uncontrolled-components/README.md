# Controlled & Uncontrolled

## Uncontrolled Concept

- 제어되지 않는 컴포넌트(Uncontrolled Components)는 컴포넌트 자체가 자체 내부 상태를 관리하는 컴포넌트이다.
  - 구성 요소 내의 데이터는 일반적으로 특정 이벤트가 발생할 때만 엑세스 된다.
  - 예) 폼 입력 값이 외부에 알려진 제어되지 않는 컴포넌트이다.

## Controlled Concept

- 반면 제어 컴포넌트(Controlled Components)는 상위 컴포넌트가 상태를 관리한다.
  - 상위 컴포넌트는 상태를 처리하고, 제어되는 컴포넌트의 동작을 제어한다.

```jsx
// Uncontrolled Component
function UncontrolledComponent(props) {
  const { obSubmit } = props;

  const [value, setValue] = useState('');

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(value);
  }

  return (
    <form onSubmit={submitHandler}>
      <input type="text" value={value} onChange={event => setValue(event.target.value)} />
      <button type="submit">SUBMIT</button>
    </form>
  );
}
```

```jsx
// Uncontrolled Component
function ControlledComponent(props) {
  const { obSubmit, value, onChange } = props;

  return (
    <form onSubmit={obSubmit}>
      <input type="text" value={value} onChange={onChange} />
      <button type="submit">SUBMIT</button>
    </form>
  );
}
```

- 테스트하기 쉬운 경향이 있어, 대부분의 경우 제어 컴포넌트가 선호된다.
