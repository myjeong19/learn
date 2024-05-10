# 인터페이스(Interface)

- 객체의 구조를 정의하는 것을 인터페이스라고 한다.

  - interface 키워드로 생성하며, 타입스크립트에서만 지원한다.
  - 인터페이스는 커스텀 타입과 비슷하다.

    ```ts
    interface Person {
      name: string;
      age: number;

      greet(phrase: string): void;
    }

    let user1: Person;

    user1 = {
      name: 'Max',
      age: 30,
      greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
      },
    };

    user1.greet('Hi there - I am');
    ```

## 인터페이스를 사용하는 이유

- type 키워드를 사용해 커스텀 타입을 설정해도 되는데, 인터페이스를 왜 사용할까?  
  인터페이스와 커스텀 타입은 완전히 같은 게 아니다.

  - 인터페이스를 사용하면, 객체의 구조를 정의한다고 명확하게 나타낼 수 있다.
  - 인터페이스는 클래스 안에 인터페이스를 구현할 수 있다.
    - 클래스는 하나만 상속 받을 수 있지만, 인터페이스는 쉼표로 구분해 여러개 구현할 수 있다.  
      따라서, 여러 클래스에서 기능을 공유하기 위해 인터페이스를 사용한다.

- 추상 클래스와 인터페이스의 차이

  - 추상 클래스에서는 오버라이드할 추상 메서드를 제공하면서도, 완전히 구현된 부분도 함께 제공할 수 있었지만,
    인터페이스는 아무런 구현도 하지 않는다.

- 상수나 변수의 타입을 특정 인터페이스로 지정했을 때, 해당 인터페이스를 구현한 클래스의 객체도 저장할 수 있다.

        ```ts
        interface Greetable {
        name: string;

        greet(phrase: string): void;
        }

        class Person implements Greetable {
        name: string;
        age = 30;

        constructor(name: string) {
            this.name = name;
        }

        greet(phrase: string) {
            console.log(phrase + ' ' + this.name);
        }
        }

        let user1: Greetable;

        user1 = new Person('Max');

        user1.greet('Hi there - I am');
        ```

## 왜 인터페이스인가

- 인터페이스는 특정한 구조를 강제하는 것이며, 다른 코드들이 이 구조에 의존할 수 있도록 도움을 주며,  
  인터페이스를 활용하면 객체나 클래스에 정확히 무엇이 들어있는지 모르더라도 필요한 메서드가 존재하는지 확인할 수 있다.

## 읽기 전용 인터페이스 속성

- 인터페이스 안에 public이나, private 키워드는 사용할 수 없지만, readonly 접근 제한자는 사용할 수 있다.
  - readonly를 사용하면, 해당 프로퍼티는 한 번만 설정할 수 있도록 제한된다.
    - 이는 타입으로 선언해도 사용할 수 있다.
  - readonly를 사용하면, 클래스에서 readolny를 지정하지 않아도, 수정할 수 없는 값이 된다.

## 인터페이스 확장

- 인터페이스에서도 상속 개념을 활용할 수 있다.

  - 쉼표를 사용해 여러개의 상속 또한 가능하다.

  ```ts
  interface Named {
    readonly name: string;
  }

  interface Greetable extends Named {
    greet(phrase: string): void;
  }

  class Person implements Greetable {
    name: string;
    age = 30;

    constructor(name: string) {
      this.name = name;
    }

    greet(phrase: string) {
      console.log(phrase + ' ' + this.name);
    }
  }

  let user1: Greetable;

  user1 = new Person('Max');

  user1.greet('Hi there - I am');
  ```

## 함수 타입으로써 인터페이스

- 함수는 객체이기에, 인터페이스 또한 함수의 구조를 정의하는 데 커스텀 타입 대신 사용 할 수 있다.

  - 물론 커스텀 타입을 사용하는 게 더 일반적이다.

    ```ts
    // type AddFn = (a: number, b: number) => number;
    interface AddFn {
      (a: number, b: number): number;
    }

    let add: AddFn;

    add = (n1: number, n2: number) => {
      return n1 + n2;
    };
    ```

## 선택적 매개변수 & 속성

- 프로퍼티 이름 뒤에 ?를 붙여 인터페이스와 클래스에서 선택적 프로퍼티도 정의할 수 있다.

  ```ts
  interface Named {
    readonly name: string;
    outputName?: string;
  }
  ```

## 인터페이스 컴파일

- 인터페이스는 변환되지 않으며, 개발과 컴팡리에서만 사용할 수 있다.
