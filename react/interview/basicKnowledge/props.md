# What are functional components and props?

- How to create functional components?

  - Functional components는 React의 빵과 버터이다.
    Component의 전체 트리는 서로 사용하는 Functional Component의 묶음일 뿐이다.

    - Funtional Component의 중요한 점은 내부에 state가 없다는 것이다.
      - Component를 렌더링할 때 마다 내부 요소는 다시 렌더링 되며, 이는 내부에 state가 없음을 의미한다.

```jsx
function Button() {
  return <button>Button</button>;
}

function App() {
  return (
    <div className="app">
      <Button />
    </div>
  );
}
```

- How to pass props to the components?

  - props는 하위 Component에 일부 정보를 전달하기 위해 사용한다.

    ```jsx
    function Button({ text }) {
      return <button>{text}</button>;
    }

    function App() {
      return (
        <div className="app">
          <Button text="Hi React" />
        </div>
      );
    }
    ```

- How to create class components?

  - Class Component는, React의 오래된 접근 방식이다.

```jsx
import React from 'react;

class Button extends React.Component {

}

class App extends React.Component {
    render() {
        <div className='app'>
            <Button/>
        </div>
    }
}

```

- How to pass props to class components?

- How state is working in class components?
