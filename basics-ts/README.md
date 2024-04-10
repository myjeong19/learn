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

## Object 형태

- 객체에 관해 아무 정보도 주지 않았기에, 타입스크립트는 속성의 타입을 지원하지 않아 오류가 발생한다.

```ts
const person: object = {
  name: 'Jack',
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
  name: 'Jack',
  age: 32,
};

console.log(person.name);
```

이렇게 구체적으로 타입을 설정할 수 있지만, 기본적으로 추론을 하게 두는 것이 좋다.

```js
const product = {
  id: 'abc1',
  price: 12.99,
  tags: ['great-offer', 'hot-and-new'],
  details: {
    title: 'Red Carpet',
    description: 'A great carpet - almost brand-new!',
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

## Array 타입

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

## Tuple 타입

- 타입과 배열의 길이가 고정되어있는 것을 튜플이라한다.

  ```ts
  const person: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
  } = {
    name: 'Jack',
    age: 32,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
  };
  ```

  - `push`는 튜플에서 허용되는 일종의 예외로, 타입스크립트는 이 오류를 잡지 못한다.

## 열거타입 enm

- 애플리케이션에서 사용하는 전역 상수이며, 숫자로 표현하지만 사람이 읽을 때  
  사람이 읽을 수 있는 라벨을 사용하는 것이 바로 enum이다.

- 문자열을 사용하면, 읽을 수 있는 장점이 있지만, 값을 비교할 때 정확한 문자열을 제공해야한다는 단점이 있다.

- 전역 상수를 사용하는 방법

  - `const ADMIN = 0;` 숫자, 혹은 문자열을 담을 수 있지만 숫자를 사용하는 경우, 코드를 덜 써도 되고, 메모리를 아낄 수 있다.
    하지만, 이 방식의 단점은 person의 속성 role이 숫자 타입으로 추론된다는 단점이 있다.

    ```ts
    const ADMIN = 0;
    const READ_ONLY = 1;
    const AUTHOR = 2;

    const person = {
      name: 'Jack',
      age: 32,
      hobbies: ['Sports', 'Cooking'],
      role: ADMIN,
    };

    if (person.role === ADMIN) {
      console.log('is admin'); // is admin
    }

    if (person.role === 0) {
      console.log('is admin'); // is admin
    }
    ```

- enum은 사용자 정의 타입이다.

  ```ts
  enum Role {
    ADMIN,
    READ_ONLY,
    AUTHOR,
  }

  const person = {
    name: 'Jack',
    age: 32,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
  };

  if (person.role === Role.ADMIN) {
    console.log('is admin');
  }

  if (person.role === 0) {
    console.log('is admin');
  }
  ```

- enum에 숫자를 할당할 경우, 자동으로 시작 값에서 1씩 더한 값을 할당한다.  
  또한, 모든 식별자에 임의의 값을 할당할 수도 있으며, 문자열을 할당할 수도 있다.

  ```ts
  enum Role {
    ADMIN = 5,
    READ_ONLY, // 6
    AUTHOR, // 7
  }
  ```

- enum은 사람이 읽을 수 있는 식별자가 필요하고, 내부적으로 매핑된 값이 있을 때 편리하다.

## Any 타입

- Any 타입은 타입스크립트에 아무것도 할당하지 않아, 모든 값을 할당할 수 있다.

## Union 타입

- 함수의 매개변수가 두 가지 다른 종류의 값을 받을 수 있을 때, 유니언 타입을 사용할 수 있다.

- 타입스크립트는 유니언 타입 자체만을 보고 분석하지 않고, 그냥 다양한 타입의 값이 들어 올 수 있다고 판단한다.

```ts
function combine(input1: number | string, input2: number | string) {
  // const result = input1 + input2; // '+' 연산자를 'string | number' 및 'string | number' 형식에 적용할 수 없습니다.ts(2365)
  let result: number | string;
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);
```

## literal 타입

- 타입을 정의하는 것이 아닌, 값을 정의하는 것이다.

  - literal을 정의하면, 특정 값만 받을 수 있으며, 대소문자를 구분한다.

    ```ts
    function literal(resultConversion: 'STRING' | 'text') {
      return resultConversion;
    }

    // const literalResult = literal("TEXT");
    // console.log(literalResult); // Argument of type '"TEXT"' is not assignable to parameter of type '"STRING"'.

    const literalResult = literal('STRING');
    console.log(literalResult); // STRING
    ```

## type alias

- 유니언 타입을 일일이, 명시하지 않고 alias를 사용하면 새로운 타입을 생성할 수 있다.

  ```ts
  type Combinable = number | string;
  type STRING = 'STRING' | 'string';

  function combine(input1: Combinable, input2: Combinable, input3: STRING) {
    // const result = input1 + input2; // '+' 연산자를 'string | number' 및 'string | number' 형식에 적용할 수 없습니다.ts(2365)
    let result: number | string;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
      result = input1 + input2;
    } else {
      result = input1.toString() + input2.toString();
    }
    return result;
  }

  const combinedAges = combine(30, 26, 'STRING');
  console.log(combinedAges);
  ```

- 복잡할 수 있는 객체 타입에도 사용할 수 있다.

  - 변경 전

    ```ts
    function greet(user: { name: string; age: number }) {
      console.log('Hi, I am ' + user.name);
    }

    function isOlder(user: { name: string; age: number }, checkAge: number) {
      return checkAge > user.age;
    ```

  - 변경 후

    ```ts
    type User = { name: string; age: number };

    function greet(user: User) {
      console.log('Hi, I am ' + user.name);
    }

    function isOlder(user: User, checkAge: number) {
      return checkAge > user.age;
    }
    ```

## 함수 반환 타입 및 '무효' void

```ts
function add(a: number, b: number): number {
  return a + b;
}

function printResult(num: number): void {
  console.log('Result: ' + num);
}

printResult(add(5, 12));
```

- 위 코드의 printResult는 문자열을 반환한다 생각할 수 있지만, 사실 아무것도 반환하지 않는다.  
  그래서 printResult는 특별한 반환 타입인 void를 갖는다.

- void는 함수에 반환 구문이 없다는 것을 의미한다.

- `console.log(printResult(add(5, 12)));`는 undefined를 반환한다.

  - undefined는 실제로 어떤 값이며, 존재하지 않는 속성이나 객체에 접근할 때 나타나는 값이다.
  - 이 경우, void가 기술적으로는 undefined를 반환함을 알 수 있다.

  - undefined는 타입스크립트의 타입이다.
    - 하지만 함수 함수가 아무것도 반환하지 않을 때 void는 쓸 수 있지만, undefined는 쓸 수 없다.
    - 타입스크립트에서 반환 구문은 있지만, 아무 값도 반환하지 않을 때 사용한다.

## 타입 기능을 하는 함수

- 함수를 변수에 담을 때, 변수의 타입은 any로 추론되므로, 함수가 아닌 값을 할당할 수 있다.

  ```js
  let combineValues;
  combineValues의 타입이 any로 추론되었기에 5가 할당된다.
  combineValues = 5;

  console.log(combineValues); // 5
  ```

- 첫 번째 단계는 여기 타입을 Function이라고 명시하는 것이다.

  - 하지만 Function을 명시하는 경우, 다른 함수 값도 할당할 수 있는 문제가 있다.
    이 때 Function 타입을 화살표 표기법으로 만들면 이를 해결할 수 있다.

    ```ts
    let combineValues: (a: number, b: number) => number;
    combineValues = add;
    console.log(combineValues(8, 8)); // 16
    ```

  - 화살표 함수의 오른쪽은 반환 값을 의미한다.

## 함수 타입 및 콜백

- 콜백과 함수 타입은 거의 같은 방식으로 동작한다.

- 콜백 함수에 타입을 사용하면, 함수 인자를 정확히 전달 할 수 있다.

  ```ts
  function addAndHandle(n1: number, n2: number, cb: (number: number) => void) {
    const result = n1 + n2;
    cb(result);
  }

  addAndHandle(10, 20, result => {
    console.log(result);
  }); // 30
  ```

## unknown 타입

- 인풋과 강티 사용자가 무엇을 입력할지 모를 때, unknown 타입을 준다.

- any와 비슷하지만 다르다.

  ```ts
  let userInput: unknown;
  let userName: string;

  userInput = 5;
  userInput = 'Max';

  // userName = userInput; // Error: Type 'unknown' is not assignable to type 'string'.
  ```

  - userInput이 unknown인 경우, 오류가 발생하지만 any로 바꾸면 오류가 발생하지 않는다.

    - 타입스크립트에서 any는 가장 유연한 타입이며, 타입 확인 자체를 하지 않는다. 하지만 unknown은 조금 더 제한적이다.  
      unknown 타입의 값을 타입이 정해진 변수에 할당하기 위해서는 아래와 같이 별도의 작업이 필요하다.
      이 점이 any보다 unknown이 나은 점이라고 볼 수 있다.

      ```ts
      if (typeof userInput === 'string') {
        userName = userInput;
      }
      ```
