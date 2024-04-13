# 제네릭 (Generic) 타입

## 제네릭이란?

- 제네릭 타입은 다른과 연결된 타입으로, 다른 타입이 무엇인지 명시되어 있다.

```ts
const names: string[] = ['Max', 'Manuel'];
// or
const names: Array<string> = ['Max', 'Manuel'];
```

- Promise도 배열 타입처럼 다른 타입과 함께 작동한다

```ts
const promise = new Promise<string>((resolve, reject) => setTimeout(() => resolve('This is done!'), 2000));
```

- 제네릭 타입을 사용하면, 반환 값이 무엇인지 알 수 있게 되어, 반환 타입에 따른 메서드를 사용 할 수 있다.

## 제네릭 함수와 제약 조건

```ts
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergeObj.age);
```

- 조건을 걸려는 타입 뒤에 extends 키워드를 넣으면 제약 조건을 넣을 수 있다.
  - 제약 조건은 커스텀 타임을 포함해 뭐든 될 수 있다.

```ts
interface Lengthy {
  length: number;
}

function countAndPrintDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length > 0) {
    descriptionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }

  return [element, descriptionText];
}

console.log(countAndPrintDescribe('Hi there!'));
```

- 제네릭 타입을 활용하면 정확한 타입은 신경쓰지 않을 수 있다.

## keyof 제약 조건

- 제네릭 함수를 사용하여 객체의 속성에 접근할 때 keyof 제약 조건을 사용할 수 있다.  
  제네릭 타입 T와 keyof T를 사용하면 속성이 존재하는지 확인할 수 있다.

  ```ts
  function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
  }

  console.log(extractAndConvert({ name: 'Max' }, 'name'));
  ```

- 첫 번째 매개변수는 객체, 두 번째 매개변수는 해당 객체의 속성이 된다.
  - 제네릭 타입을 사용하여 속성에 접근할 때 오류를 방지할 수 있다.
