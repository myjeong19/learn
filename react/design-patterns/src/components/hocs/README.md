# HOCs (Higher Order Components)

- HOCs는 간단한 동작의 경우, JSX르 직접 반환하는 대신 또 다른 컴포넌트를 반환한다.

Default. Component -> JSX
HOCs. HOC -> Component -> JSX

- 본질적으로 컴포넌트를 반환하는 함수이다.
  - 이를 컴포넌트 팩토리 함수로 생각할 수 있다.

## HOCs를 사용하는 이유

- 여러 컴포넌트 간, 동작을 공유할 수 있다.
- 기존 컴포넌트에 새로운 동작을 추가할 수 있다.
- 기존 레거시 컴포넌트를 수정하기 용이하다.
