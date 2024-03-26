# 타입스크립트 기본 & 기본 타입

## UsingTypes

- 자바스크립트와 타입스크립트에서 사용하는 핵심 타입 중 하나는 숫자(number)이다.

  - 자바스크립트와 타입스크립트에서 숫자 타입은 하나뿐이다.
  - 1, 5.3, -10

- 텍스트(Text) 타입이 있다.

  - "Hi", 'Hi', \`Hi\`

- 불리언(boolean)

  - True, False

## 타입스크립트 타입 vs 자바스크립트 타입

- 브라우저는 내부적으로 타입스크립트를 지원하지 않기에, 타입스크립트는 컴파일 할 때만 유용하다.
- 타입스크립트는 컴파일을 차단하지 않고, 타입 오류를 알려준다.

- 자바스크립트는 동적 타입을 사용하는 반면, 타입스크립트는 정적 타입을 사용해,  
  개발 시 변수와 매개변수의 타입 정의가 끝난다.

- 이론적으로 타입스크립트는 자바스크립트로 컴파일 되기에, 런타임에 변경될 수 있다.

  - 타입스크립트 타입은 컴파일 중에 확인 되는 반면, 자바스크립트 타입은 런타임 중에 확인된다.

- 새로운 타입의 데이터 변수에 할당하는 코드를 작성하면 개발 중 오류가 발생한다.

  - 타입스크립트 기능과 검사는 자바스크립트 엔진에 내장되어 있지 않기에, 타입스크립트는 런타임에 지원하지 않는다.

- 타입스크립트의 주요 원시 타입은 모두 소문자이다.

## 숫자 문자열 및 불리언 작업하기

- 자바스크립트와 타입스크립트의 모든 숫자는 기본적으로 실수(float)이다.

## 타입 할당 및 타입 추론

- 타입스크립트에는 타입 추론이라는 내장 기능이 있다.

  - 특별히 타입을 부여하지 않아도, `let firstNumber = 5;` 처럼, 타입을 감지한다.

  - 타입스크립트는 타입을 완벽하게 추론하기에, 아래의 코드는 중복되는 작업이며 좋은 방식이 아니다.

    ```ts
    let number1: number = 5;
    ```

    - 특별히 타입을 명시하지 않고, 값을 할당하지 않으면 any타입이 된다.

## 객체 형태

- 객체에 관해 아무 정보도 주지 않았기에, 타입스크립트는 속성의 타입을 지원하지 않아 오류가 발생한다.

```ts
const person: object = {
  name: "Jack",
  age: 32,
};

console.log(person.name);
```

- 더 구체적으로 하기 위해서는 구체적으로 객체 타입을 설정해야한다.

```ts
const person: {
  name: string;
  age: number;
} = {
  name: "Jack",
  age: 32,
};

console.log(person.name);
```

이렇게 구체적으로 타입을 설정할 수 있지만, 기본적으로 추론을 하게 두는 것이 좋다.

```js
const product = {
  id: "abc1",
  price: 12.99,
  tags: ["great-offer", "hot-and-new"],
  details: {
    title: "Red Carpet",
    description: "A great carpet - almost brand-new!",
  },
};
```

이러한 객체 타입은 아래와 같다.

```ts
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```

## 배열 타입

- 타입스크립트는 어떤 자바스크립트 배열이라도 지원하며, 유연하거나 제한적으로 지정할 수 있다.

- 혼합 배열을 지원하기 위해서 any타입을 사용할 수 있다.

  - 하지만 any를 사용하는 경우, 타입스크립트의 장점을 잃어버리게 된다.

  ```ts
  // 문자열 배열
  let favoriteActivities: string[];
  let favoriteActivities2: any[];
  ```

- hobby가 문자열임을 알기에, 문자열처럼 취급하며 문자열 메소드를 사용할 수 있다.

  ```ts
  for (const hobby of person.hobbies) {
    console.log(hobby.toString());
  }
  ```

## 튜플

- 타입과 배열의 길이가 고정되어있는 것을 튜플이라한다.

  ```ts
  const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
  } = {
    name: "Jack",
    age: 32,
    hobbies: ["Sports", "Cooking"],
    role: [2, "author"],
  };
  ```

  - `push`는 튜플에서 허용되는 일종의 예외로, 타입스크립트는 이 오류를 잡지 못한다.