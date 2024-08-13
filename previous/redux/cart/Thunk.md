# 데이터를 fetch 하기 전에, 모든 부작용 논리를 컴포넌트에 넣는 대안

- action creators를 사용하는 방법  
  Redux toolkit을 통해 자동으로 action creators를 확보할 수 있다.  
  action creattors를 불러와서, dispatch할 작업 객체를 생성하는데,  
  이것이 바로 자동으로 생성된 작업 크리에이터이다.

## Thunk란 무엇인가?

- Thunk는 다른 작업이 완료될 때 까지 작업을 지연시키는 함수이다.
  - action object를 즉시 반환하지 않는 action creators 작성하기 위해 Thunk를 고려할 수 있다.
    - 즉, 작업을 반환하는 다른 함수를 반환하는 것이다.
