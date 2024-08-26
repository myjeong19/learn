# useState

- [useState](<[text](https://ko.react.dev/reference/react/useState)>)

- useState는 컴포넌트에 state 변수를 추가할 수 있는 React Hook임.

  - state 변수: 컴포넌트는 현재 입력값, 현재 이미지, 장바구니와 같은 것들을 “기억”해야 함. React는 이런 종류의 컴포넌트별 메모리를 state라고 부름

## 참조

### 매개변수

- initialState: state의 초기 설정값. 어떤 유형의 값이든 지정할 수 있음.

  - 함수에 대해서는 특별한 동작이 있으며, 이 인수는 초기 렌더링 이후에는 무시됨.

        - 함수를 initialState로 전달하면 이를 초기화 함수로 취급.
          이때, 함수는 순수 함수여야하며, 반드시 어떤 값을 반환해야함.
          React는 컴포넌트를 초기화 할 때, 초기화 함수를 호출하고 그 반환 값을 초기 state로 저장함.

### 주의사항

- 컴포넌트의 최상위 레벨에서 호출 가능.

- Strict Mode 에서는, 의도치 않은 동작을 찾기 위해 초기화 함수를 두번 호출함.
  - 프로덕션 환경에서는 영향을 미치지 않음.

## setSomething(nextState)과 같은 set 함수

- useState가 반환하는 set 함수를 사용하면 state를 다른 값으로 업데이트하고 리렌더링을 촉발할 수 있음.
  여기에는 다음 state를 직접 전달하거나, 이전 state로부터 계산한 함수를 전달할 수도 있음.

### 매개변수

- nextState: state가 될 값. 모든 값을 허용하지만 함수에 대해서 특별한 동작을 함.

  - 함수를 nextState로 전달하면, 업데이터 함수로 취급,
    이 함수는 순수하고 대기 중인 state를 유일한 인수로 사용해야하며, 다음 state를 반환해야함.

    React는 업데이터 함수를 대기열에 넣고 컴포넌트를 리렌더링하며, 다음 렌더링 중에 대기열에 있는 모든 업데이터를 이전 state에 적용하여 다음 state를 계산함.

### 반환 값

- set함수는 반환 값 없음

### 주의사항

- set 함수는 다음 렌더링에 대한 state 변수만 업데이트함. set 함수를 호출한 후에도 state 변수에는 여전히 호출 전 화면에 있던 이전 값이 담겨 있음.

- useState는 `Object.is`로 최적화를 진행하는데,
  새로운 값이 현재 state와 동일하다고 판정되면, React는 컴포넌트와 그 자식들을 리렌더링하지 않음.
  경우에 따라 React가 자식을 건너뛰기 전에 컴포넌트를 호출해야 할 수도 있지만, 코드에 영향을 미치지는 않음.

- state 업데이트를 batch 함.

  - 모든 이벤트 핸들러가 실행되고, set 함수를 호출한 후, 화면을 업데이트해, 이벤트 중 여러 번 리렌더링하는 경우를 방지 할 수 있음.
  - 드물지만, DOM에 접근하기 위해 React가 화면을 더 업데이트하도록 강제해야 하는 경우, `flushSync`를 사용할 수 있음.
  - 렌더링 도중 set 함수를 호출하는 것은 현재 렌더링 중인 컴포넌트 내에서만 허용됨.
    React는 해당 출력을 버리고 즉시 새로운 state로 다시 렌더링을 시도하며, 이 패턴은 거의 필요하지 않지만 이전 렌더링의 정보를 저장하는 데 사용할 수 있음

## 스냅샷으로서의 State

- state는 스냅샷처럼 동작함.
  state 변수를 설정하여도 이미 가지고 있는 state 변수는 변경되지 않고, 대신 리렌더링이 발동됨.

컴포넌트 렌더링이 일어나는 경우는 두 가지가 있다.

- 컴포넌트의 초기 렌더링인 경우
- 컴포넌트의 state가 업데이트된 경우

### 렌더링은 그 시점의 스냅샷을 찍음

- 렌더링 즉, 컴포넌트 함수를 호출한다는 의미.

  - 해당 함수에서, 반환하는 JSX 시간 상 UI 스냅샷과 같으며,
    `props`, 이벤트 핸들러, 로컬 변수는 모두 렌더링 당시 state를 사용해 계산됨.

    - UI스냅샷은 사진, 동영상 프레임과 달리 대화형임.

      - React는 이 스냅샷과 일치하도록 화면을 업데이트하고, 이벤트 핸들러를 연결함.
      - React가 컴포넌트를 리렌더링할 때, 3가지 동작으로 나눌 수 있음
        1. React가 함수를 다시 호출
        2. 함수가 JSX 스냅샷 반환
        3. React가 반환한 스냅샷과 일치하도록 화면을 업데이트함.

- state는 컴포넌트의 메모리, React 자체에 존재함.
  - React가 컴포넌트를 호출하면 특정 렌더링에 대한 state의 스냅샷을 제공해,
    해당 렌더링 state값을 사용해, 계산된 새로운 UI 스냅샷을 JSX에 반환함.

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

state를 설정하면 다음 렌더링에 대해서만 변경되기 떄문에,
위 코드는 +3을 클릭시, set 함수를 세번 호출하므로 카운터가 3번 증가할 것으로 예상할 수 있지만,
실제로 그렇지 않음.

- number은 0 이며, number + 1은 1로, 다음 렌더링 시, 1로 변경할 준비를 함.

  - 아래 코드 또한, 마찬가지로 변경할 준비를 하고, 다음 렌더링 시, 반영을 하는 것이기에
    위 코드의 state는 1로 변함

### 시간 경과에 따른 state

```js
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        onClick={() => {
          setNumber(number + 5);
          alert(number);
        }}
      >
        +5
      </button>
    </>
  );
}
```

- `alert`은 렌더링 이전에 동작하는 코드이므로, number는 업데이트 이전의 값을 반환하게됨.
- `setTimeout`과 같은 코드를 추가해도, 이전 값을 바라보고 있으므로 이 또한 스냅샷을 반환하게 됨.
  - state 변수의 값은 이벤트 핸들러의 코드가 비동기적이더라도 렌더링 내에서 절대 변경되지 않음.
  - 리렌더링 전에, 최신 state를 읽고 싶은 경우, state 갱신 함수를 사용하면 됨.

## state 업데이트 큐

- state 변수를 설정하면 다음 렌더링이 큐에 들어가게 됨

  - 그러나 때에 따라 다음 렌더링을 큐에 넣기 전에, 값에 대해 여러 작업을 수행하고 싶을 때도 있음.
    이때, React가 state 업데이트를 어떻게 배치하면 좋을지 이해하는 것이 도움이 됨

### React state batches 업데이트

- setNumber(number + 1);을 몇 번 호출하던 항상 0인 이유는 하나 더 있음.
  바로, React는 state를 업데이트 하기전에, 이벤트 핸들러의 모든 코드가 실행될 때 까지 기다리기 떄문임.
  이러한 동작을 batching이라 함.

### 다음 렌더링 전에 동일한 state 변수를 여러 번 업데이트하기

- setNumber(n => n + 1) 와 같이 이전 큐의 state를 기반으로 다음 state를 계산하는 함수를 전달할 수 있음.  
  이는 단순히 state 값을 대체하는 것이 아니라 React에 “state 값으로 무언가를 하라”고 지시하는 방법임.

```js
setNumber(n => n + 1);
setNumber(n => n + 1);
setNumber(n => n + 1);
```

1. React는 이벤트 핸들러의 다른 코드가 모두 실행 된 후, 이 함수를 큐에 넣음
2. 다음 렌더링 중에, React는 큐를 순회하여 최종적으로 업데이트된 state를 제공함.

   - 이전 업데이터 함수의 반환 값을 가져와, 다음 업데이트 함수에 전달하는 식으로 반복됨
