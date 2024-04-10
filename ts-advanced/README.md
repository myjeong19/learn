# Advanced

## 교차 (intersection) 타입

- 교차 타입은 다른 타입을 함께 사용할 수 있도록 해준다.

  - 교차 타입은 객체 타입을 조합할 수 있다.
  - 교차 타입은 객체 타입 뿐만 아니라 유니언 타입도 조합할 수 있다.

        ```ts
        type Combinable = string | number;
        type Numeric = number | boolean;
        type Universal = Combinable & Numeric;
        ```

        - 유일하게 숫자 타입만 교차하기에, 타입스크립트는 Universal의 타입을 숫자로 판단한다.

- 교차 타입은 인터페이스 상속과 비슷한 기능을 제공한다.

```ts
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;
```
