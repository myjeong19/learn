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

## 제네릭 클래스

- 제네릭 클래스를 사용하면 데이터 타입에 관계 없이 같은 유형의 데이터를 저장하고 제거할 수 있다.
  - 제네릭 클래스를 사용하더라도 타입 정보를 제공해야한다.
  - 제네릭 클래스는 유연하지만 타입은 엄격히 설정된 클래스이다.
  - 클래스 안에 자체 제네릭 타입이 있는 메서드도 만들 수 있다.

```ts
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();

textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = { name: 'Max' };
// objStorage.addItem(maxObj);
// objStorage.addItem({ name: 'Manu' });

// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());
```

## 제네릭 유틸리티 타입

- 파셜(Partial)

  - 파셜을 사용하면 객체의 모든 속성이 옵션이 되는 타입으로 변환할 수 있다.

  ```ts
  interface CoursGoal {
    title: string;
    description: string;
    completeUntil: Date;
  }

  function createCourseGoal(title: string, description: string, data: Date): CoursGoal {
    let courseGoal: Partial<CoursGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = data;

    return courseGoal as CoursGoal;
  }
  ```

- 읽기 전용 (Readonly)

  - Readonly 타입을 사용하면 배열이나 객체의 속성이 읽기 전용이 된다.

  ```ts
  const names: Readonly<string[]> = ['Max', 'Sports'];
  name.push('Manu'); // ERRROR
  ```

- 모든 타입의 값을 가져와서 사용하기 때문에 유틸리티 타입은 모두 제네릭이다.

## 제네릭 타입 vs 유니언 타입

- 제네릭 타입과 유니언 타입은 비슷하지만, 데이터 저장 및 사용 방식에 차이가 있다.

- 제네릭 타입은 한 타입에 고정 되고, 유니언 타입은 여러 타입을 사용할 수 있다.

  - 제네릭 타입을 사용하면 같은 타입의 데이터만 추가할 수 있다.

    - 전체 함수 또는 클래스 인스턴스에서 같은 타입을 사용하고자 할 때 유용하다

  - 유니언 타입을 사용하면 호출할 때마다 다른 타입을 사용할 수 있다.
    - 즉, 특정 타입만을 고수할 때 유용하다.
    - 유니언 타입을 사용하면 메서드 호출 시, 다른 타입을 사용할 수 있는 유연성을 갖게 된다.
