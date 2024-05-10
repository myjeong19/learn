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

## 타입 가드 (Type Guard)

- 타입 가드는 어떤 속성이나 메소드가 존재하는지를 사용하기 전에 확인하는 작업을 의미한다.

- 타입 가드는 유니언 타입을 쓸 때 도움이 된다.

```ts
type Combinable = string | number;

function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    // if문의 조건 부분을 타입 가드라고 한다.
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}
```

- 위 코드는 유니언 타입의 유연성이란 이점을 그대로 활용하면서도 런타임에 코드가 제대로 실행되게 해준다.
  typeof외 다른 종류의 타입 가드도 있다.

  - in을 사용해, 객체 내부에 해당 속성의 존재 여부를 확인할 수 있다.

    ```ts
    function printEmployeeInformation(emp: UnkbownEmployee) {
      console.log('Name: ' + emp.name);
      //   console.log('Privileges: ' + emp.privileges);

      if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
      }

      if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
      }
    }

    printEmployeeInformation(e1);
    console.log('-------------------');
    printEmployeeInformation({ name: 'Manu', startDate: new Date() });
    ```

- 클래스가 대상이 되면 instanceof 타입 가드를 사용할 수 있다.

  ```ts
  class Car {
    drive() {
      console.log('Driving...');
    }
  }

  class Truck {
    drive() {
      console.log('Driving a truck...');
    }

    loadCargo(amount: number) {
      console.log('Loading cargo ...' + amount);
    }
  }

  type Vehicle = Car | Truck;

  const v1 = new Car();
  const v2 = new Truck();

  function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
      vehicle.loadCargo(1000);
    }
  }
  ```

## 구별된 유니언

- 구별된 유니언은 타입 가드의 종류 중 하나로, 객체와 유니언 타입을 대상으로 타입 가드를 구현할 때 도움이 된다.

  - 구별된 유니언은 객체에 추가 공통 속성을 부여해 사용한다.

  ```ts
  interface Bird {
    type: 'bird';
    flyingSpeed: number;
  }

  interface Horse {
    type: 'horse';
    runningSpeed: number;
  }

  type Animal = Bird | Horse;

  function moveAnimal(animal: Animal) {
    let speed;

    switch (animal.type) {
      case 'bird':
        speed = animal.flyingSpeed;
        break;
      case 'horse':
        speed = animal.runningSpeed;
        break;
    }

    console.log('Moving at speed: ' + speed);
  }

  moveAnimal({ type: 'bird', flyingSpeed: 10 });
  moveAnimal({ type: 'horse', runningSpeed: 20 });
  ```

## 형변환 (type casting)

- 타입스크립트가 타입을 판단하지 못할 때 형 변환은 어떤 값이 어떤 타입인지를 타입스크립트에게 알려준다.

  - DOM에 접근할 때 유용하다.
  - 형 변환은 값의 타입을 명시적으로 지정하는 것이다.

- 일종의 타입인 HTML 요소는 일반적인 것이고, 특정 HTML 요소에 특화된 속성을 지원하지 않는다.

  ```ts
  const userInput = document.getElementById('user-input')!;

  userInput.value = 'Hi there!';
  // ERROR: 'HTMLElememnt' 형식에 'value' 속성이 없습니다.
  ```

  - 이 때, 형변환을 처리할 수 있는 구문은 두 가지 이며, 하는 일은 동일하다.

    1. 형 변환 대상 앞에 추가하기

       ```ts
       const userInput = <HTMLInputElement>document.getElementById('user-input')!;
       userInput.value = 'Hi there!';
       ```

    2. JSX를 위한 형 변환

       ```ts
       const userInput = document.getElementById('user-input')! as HTMLInputElement;
       ```

- !는 타입스크립트에게 절대 null이 아닐 것임을 알려준다.

  - null이 반환 될지 확신할 수 없으면 if문을 사용하면 된다.

    ```ts
    const userInputElement = document.getElementById('user-input');

    if (userInputElement) {
      (userInputElement as HTMLInputElement).value = 'Hi there!';
    }
    ```

## 인덱스(index) 타입

- 인덱스 타입은 객체를 생성할 때 도움이 된다.

  - 인덱스 타입은 에러 컨테이너를 만들 때 유용하게 사용되며,  
    문자열로 된 속성 이름과 문자열, 숫자 심볼 값으로 이루어진 객체를 만들 수 있다.
  - 인덱스 타입은 속성 이름을 모르고, 개수도 모를 때 유연하게 사용 가능하다.
    - 인덱스 타입이 string인 경우, 객체에 숫자형을 추가할 수 없다.

  ```ts
  interface ErrorContainer {
    [prop: string]: string;
  }

  const errorBag: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Username is too short',
  };
  ```

## 함수 오버로딩 (Function overloading)

- 타입스크립트는 result가 숫자인지 문자열인지 모르기에,  
  result에 toString과 같은 문자열 메소드를 사용할 수 없다.

  ```ts
  type Combinable = string | number;

  function add(n1: Combinable, n2: Combinable) {
    if (typeof n1 === 'string' || typeof n2 === 'string') {
      return n1.toString() + n2.toString();
    }
    return n1 + n2;
  }

  const result = add('Max', 'Schwarz');
  // result.toString  // Error
  ```

  - 이러한 문제를 형 변환을 통해 해결할 수 있지만, 이 때 함수 오버로딩을 사용해 해결할 수도 있다.  
    함수 오버로딩을 사용하는 방법은, 대상 함수 바로 위에 대상 함수를 써주는 것이다.

    ```ts
    type Combinable = string | number;

    function add(a: number, b: number): number;
    function add(a: string, b: string): string;
    function add(a: number, b: string): string;
    function add(n1: Combinable, n2: Combinable) {
      if (typeof n1 === 'string' || typeof n2 === 'string') {
        return n1.toString() + n2.toString();
      }
      return n1 + n2;
    }

    const result = add('Max', 'Schwarz');
    result.split(' '); // ['Max', 'Schwarz']
    ```

- 즉, 함수 오버로딩은 타입스크립트가 스스로 반환값 타입을 식별할 수 없을 때 사용할 수 있다.
