# React Redux

- store > index.js

  ```js
  import { createStore } from 'redux';

  const counterReducer (state={counter:0}, action ) => {
    ...
  }

  const store = createStore(counterReducer)
  ```

## 스토어 제공하기

- index.js

  ```jsx
  import { Provider } from 'react-redux';
  import store from './store/index';

  ...

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  ```

## 컴포넌트에서 리덕스 데이터 사용하기

```jsx
import { useSelector } from 'react-redux';
// useSelector 저장소가 관리하는 상태 부분을 자동으로, 선택할 수 있다.

const counter = useSelector(state => state.counter.counter);
// useSelector의 인자로 함수를 받고, redux에 의해 실행되며, 저장소에서 추출하려는 데이터를 결정한다.
```

- `useSelector`를 사용하면, 상태 객체 전체에서 일부분만 쉽게 잘라낼 수 있다.
  - `useSelector`의 인자 함수는 리덕스가 관리하는 상태를 받고, 추출하려는 상태 일부분을 가져올 수 있다.
  - `useSelector`를 사용하면, `useSelector`를 사용하는 컴포넌트를 위해 자동으로 저장소 구독을 설정한다.

## 컴포넌트에서 Action을 Dispath하기

- `useDispatch`는 Redux store에 대한 action을 보낸다.

- Counter.js

  ```jsx
  import { useSelector, useDispatch } from 'react-redux';

  const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  ...
  const incrementHandler = () => dispatch({type: 'increment'});

  ...

  return <main>...</main>;
  };
  ```

## 페이로드(payload) 연결하기

- 페이로드란: "액션의 실행에 필요한 임의의 데이터",

- Counter.js

  ```jsx
      ...
  const incrementHandler = () => dispatch({type: 'increase', amount: 10});
      ...
  ```

- store > index.js

  ```jsx
  if(action.type === 'increase) {
    return {
        counter:state.counter + action.amount
    }
  }

  ```

## 여러 State 속성 작업하기

```jsx
const initalState = { counter: 0, showCounter: false };

const counterReducer = (state = initalState, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    };
  }

  return state;
};
```

## Redux State를 올바르게 사용하는 방법

- reducer의 새 스냅샷을 제공하는 객체는, 기존 state와 병합되지 않고, 기존 state를 덮어쓴다.

  - 따라서, 두 가지 이상의 state를 가지고 있는 경우, 사용하지 않더라도 명시해주어야한다.

- reducer가 새로운 값을 반환해야하는 이유는 무엇인가?

  - 디버깅이 어려워지며, 예측 불가능한 동작이 발생할 수 있기에, 절대 기존의 state를 변형해서는 안된다.
    - state를 정확히 반영하지 않을 수도 있다.

## 리덕스에서 관리할 상태가 더 많아질 때 생길 수 있는 문제

- 오타로 인해, 액션 타입에 문제가 생길수도 있다.

  - 상수로 값을 할당해 해결할 수 있다.

  ```jsx
  export const INCREMENT = 'increment';

  ...

  if (action.type === INCREMENT) {
   return {
      counter: state.counter + 1,
     showCounter: state.showCounter,
  };

  ```

- 데이터와 상태가 많아질수록, 상태 객체가 복잡해지므로, 많은 상태를 복사해야한다.

## Redux Toolkit

- 위 문제를 Redux Toolkit을 사용해 해결할 수 있다.

  - npm i @reduxjs/toolkit

- `createSlice`을 사용하면 상태를 여러 조각으로 나눌 수 있다.

  - 모든 slice는 이름이 있어야한다.
  - slice는 리듀서를 필요로한다.

    - 이때 리듀서는, 객체 혹은 맵을 받을 수 있다.
      - 리듀서의 모든 메서드는 자동으로 최근 값과 액션을 받는다.
      - Redux Toolkit의 리듀서 함수는 immer 패키지를 사용해, 기존 상태를 변형하는 것처럼 보이는 코드를 작성할 수 있게한다.

    ```jsx
    const initalState = { counter: 0, showCounter: false };

    const counterSlice = createClice({
      name: 'counter', // slice 이름
      initialState, // 초기 값
      reducers: {
        // 리듀서 함수
        increment(state) {
          state.counter++
        },
        increase(state, action) {
          state.counter = state.counter + action.amount
        }
        ...
      },
    });
    ```

## 다수의 slice를 store에 전달하기

- `configureStore`는 createStore처럼 store를 생성하며, 여러개의 slice를 쉽게 단일 리듀서로 만들 수 있다.

  - `configureStore`는 객체를 값으로 받는다.

    - 전달 받은 객체는 `reducer`속성을 가지고 있다.

  - reducers가 아닌, reducer 속성을 가지고 있는 이유
    - 무엇을 사용하든, Redux의 전역 상태를 담당하는 단 하나의 주요 리듀서 함수만 있어야 하기 때문이다.

  ```jsx
  // const store = createStore(counter.reducer);


  const store configureStore({
    reducer: counterSlice.reducer // 단일 상태의 경우, 리듀서의 reducer 객체를 값으로 받을 수 있다.
    // reducer: {counter: counterSlice.reducer, ...} // 다수의 slice를 사용해야 하는 경우

  })
  ```

## configureStore에 action 전달하기

- `createSlice`는, 서로 다른 리듀서에 해당하는 고유 액션 식별자를 자동으로 생성한다.

  ```jsx
  export const counterActions = counterSlice.actions;
  ```

  - 속성 `actions`는, Redux Toolkit에 의해, reducers내부의 메서드를 참고해 자동으로 메서드를 생성한다.

    - 자동으로 생성된 메서드가 호출 되면, 액션 객체가 생성된다. 이러한 메서드를 액션 생성자라고 부른다.

      - type 프로퍼티 또한, 자동으로 생성된다.

      - 액션 생성자 메소드의 인자로 값을 전달해, 페이로드에 값을 전달할 수 있으며,  
        이떄 Redux Tookit은 payload 속성에 값을 전달한다.

      ```jsx
      import { useDispath } from 'react-redux';
      import { counterActions } from '../store/index';

      const Counter = () =>{
        const dispath = uesDispath();
        ...
        cnost handleIncrement = () => dispath(counterActions.increment())

      }
      ```

## 인증 유무에 따른 렌더링

- -App.js;
  `useSelctor`를 사용해, 저장소의 값을 가져온다.
  가져온 값인 isAuthenticated의 true,false 여부에 따라 화면을 렌더링한다.

  ```jsx
  import { useSelector } from 'react-redux';

  import Header from './components/Header';
  import Auth from './components/Auth';
  import UserProfile from './components/UserProfile';

  function App() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);

    return (
      <>
        <Header />
        {!isAuth && <Auth />}
        {isAuth && <UserProfile />}
      </>
    );
  }

  export default App;
  ```

  - Auth.js
    `useDispath`를 사용해 액션을 전달한다.

  ```jsx
  import { useDispatch } from 'react-redux';
  import classes from './Auth.module.css';
  import { authActions } from '../store/auth';

  const Auth = () => {
    const dispatch = useDispatch();
    const handleLogin = event => {
      event.preventDefault();

      dispatch(authActions.login());
      // authActions.logn()는 isAuth를 true로 변환
    };

    return (
      <main className={classes.auth}>
        <section>
          <form onSubmit={handleLogin}>
            <div className={classes.control}>
              <label htmlFor='email'>Email</label>
              <input type='email' id='email' />
            </div>
            <div className={classes.control}>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' />
            </div>
            <button>Login</button>
          </form>
        </section>
      </main>
    );
  };

  export default Auth;
  ```
