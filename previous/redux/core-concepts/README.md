#React_The_Complete_Guide_2024

## React 앱의 State에 대한 또 다른 관점

- 리덕스는 크로스 컴포넌트 또는 앱 와이드 상태를 위한 상태 관리 시스템이다.

  - **크로스 컴포넌트**(cross-component): 다수의 컴포넌트에 영향을 주는 State
  - **앱 와이드 스테이트**(app-wide state): 애플리케이션의 전반적인 컴포넌트에 영향을 주는 State

- 상태를 3가지로 구분할 수 있다.

  1. 로컬 스테이트(Local State)
     - 로컬 스테이트는 데이터가 변경되어서 하나의 컴포넌트에 속하는 UI에 영향을 미치는 상태이다.
     - `useState`, `useReducer`
  2. 크로스 컴포넌트

     - 다수의 컴포넌트에 영향을 미치는 상태
     - 모달 오버레이를 열거나 닫는 버튼
     - prop 체인(prop chains) 구축 / prop 드릴링 (prop drilling)

  3. 앱 와이드 스테이트
     - 모든 컴포넌트에 영향을 미치는 상태
     - 사용자 인증
     - prop 체인 / prop 드릴링

---

## Redux vs Ract Context API

- Context를 쓰면 prop chain, prop drilling을 하지 않아도 된다.

  - Context의 잠재적인 단점
    - 설정이 복잡해진다.
      - 리액트 Context를 이용한 상태관리가 상당히 복잡해진다.
        - 복잡성은 애플리케이션의 종류에 따라 달라진다. 소형 또는 중형 애플리케이션은대부분 문제가 되지 않는다. 하지만, 엔터프라이즈 수준의 애플리케이션 같은 경우, ContextProvider가 많이 생기게 되어, 심하게 중첩된 코드를 가지게 될 수 있다.
    - 복잡한 설정에 따른 복잡한 관리 - 하나의 큰 Context로 묶는 경우, 다양한 상태를 관리하기에, 유지보수가 어려워질수 있다.
    - Context를 부적절한 상태를 관리하게 된다면, 성능이 나빠질 수 있다.
      - 리액트 팀원은 "Context가 저빈도 업데이트에는 아주 좋지만, 고빈도 업데이트의 경우 좋지 않다." 고 언급한적이 있다. 즉, 유동적 상태 확산을 대체할 수 없다는 의미다.
        <img src='./sebmarkbage.png'/>
        - Redux는 유동적 상태 관리 라이브러리이다. 즉 Context가 모든 시나리오와 모든 경우에서 Redux를 훌룡하게 대체할 순 없다.

- 둘 중에 하나를 선택하는 의사 결정이 아니다.
  - 둘 다 같이 사용할 수도 있다.

## Redux 작동 방식

- 데이터 변경을 인지하고, 컴포넌트에 반영하기 위해선 중앙 저장소를 구독을 설정해야한다.
  저장소의 값이 변경될 시, 저장소는 컴포넌트에게 변경사항을 알려준다.

- 저장된 데이터를 변경할 때 중요한 규칙이 하나 있다.

  - 컴포넌트는 저장소에 있는 데이터를 직접 조작하지 않는 대신, 리듀서 개념을 이용한다.

  - 리듀서 함수 (Reducer Funtion)
    이 함수는 변형(Mutate)을 담당하며,  
    이때, 리듀서 함수는 일반적인 개념을 의미한다.
    (즉, 저장소 데이터의 업데이트를 담당한다.)

    - 리듀서 함수는 입력을 받고, 입력을 변환 혹은 줄이는 함수이다.
      일반적으로 변환해, 새로운 결과를 반환한다.

  - 트리거를 연결하는 방법
    컴포넌트가 액션을 Dispatch(발송) 한다.
    그래서, '컴포넌트가 어떤 액션을 트리거 한다.' 할 수 있다.  
    Redux는 이 액션을 리듀서로 전달하고, 원하는 작업에 대한 설명을 읽게 된다.

## 리듀서 함수와 저장소 만들기

```jsx
const redux = require('redux');

const counterReducer = () => {};
// * 1. 기존의 상태
// * 2. 발송된 액션

const store = redux.createStore();
// 저장소 생성
```

- 저장소는 데이터를 관리해야하며, 관리하는 데이터는 결국 리듀서 함수에 의해 결정된다.
  - 리듀서 함수는 기존의 상태와, 발송된 액션 두 개의 매개변수를 받으며,
    항상 새로운 상태 객체를 리턴해야만하며, 순수함수여야 한다.
    리듀서가 리턴한 객체는 기존의 상태를 대체하며, 어떠한 값도 될 수 있다.

```js
const counterReducer = (state = { counter: 0 }, action) => {
  return {
    counter: state.counter + 1,
  };
};

const store = redux.createStore(counterReducer);
```

## 구독과 액션

- `getState()`는 최신 상태 스냅샷을 제공한다.

- 구독함수 `counterSubscriber`는 상태가 변경될 때마다 실행된다.

- `disaptch()`는 액션을 전달한다.

```js
const counterSubscriber = () => {
  store.getState();
};

store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });
```

```js
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state; // action.type이 increment, decrement 둘 다 아닌 경우
};
```
