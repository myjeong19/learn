# 데코레이터 (Decorator)

- 데코레이터는 메타프로그래밍에 매우 유용하게 사용될 수 있는 기능이다.

  - 데코레이터는 페이지의 최종 사용자에게 직접적인 영향을 주는 것이 아니라 코드 작성에 특화된 도구로 사용된다.

- 메타프로그래밍 (Metaprogramming)  
  자기 자신 혹은 다른 컴퓨터 프로그램을 데이터로 취급하며 프로그램을 작성·수정하는 것을 말한다

- tsconfig.json 파일을 수정하여 데코레이터를 사용할 수 있도록 해야 한다.

- 데코레이터는 클래스에 추가되는 함수이며, 클래스 자체에 추가 된다.
  - 생성자 함수를 인자로 받는 데코레이터를 작성할 때, 인자 개수는 1개여야 한다.

```ts
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}
@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();

console.log(person);
```

- 데코레이터는 클래슥 인스턴스화 될 때 가 아니라 정의 될 때 실행되기에, 클래스의 인스턴스를 생성할 필요가 없다.
  - 데코레이터는 JS가 클래스 정의와 생성자 함수 정의를 만난 시점에 실행된다.

## 데코레이터 팩토리 (Decorator factory)

- 팩토리는 데코레이터 함수를 반환하는데, 이를 데코레이터로 추가할 때 원하는 값을 설정할 수 있다.

  - 데코레이터 팩토리는 데코레이터 함수를 반환하며, 데코레이터 함수에 원하는 값을 설정할 수 있다.

- 데코레이터 팩토리를 사용하면 내부 함수를 클래스에 추가할 수 있다.

  - 함수 인자에는 타입과 개수에 제한이 없다.

    ```ts
    function Logger(logString: string) {
      return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
      };
    }
    @Logger('LOGGING - PERSON')
    class Person {
      name = 'Max';

      constructor() {
        console.log('Creating person object...');
      }
    }

    const person = new Person();

    console.log(person);
    ```

- 문자열을 인자로 받고, 해당하는 DOM요소에, HTML 템플릿을 렌더링하는 데코레이터 펙토리를 만들 수도 있다.

  ```ts
  function WithTemplate(template: string, hookId: string) {
    return function (_: Function) {
      const hookEl = document.getElementById(hookId);
      if (hookEl) {
        hookEl.innerHTML = template;
      }
    };
  }

  @WithTemplate('<h1>My Person Object</h1>', 'app')
  class Person {
    name = 'Max';

    constructor() {
      console.log('Creating person object...');
    }
  }

  const person = new Person();

  console.log(person);
  ```

- 데코레이터를 사용하면 다른 사용자와 공유 할 수 있는 고급 기능을 구현할 수 있다.

  ```ts
  function WithTemplate(template: string, hookId: string) {
    return function (constructor: any) {
      const hookEl = document.getElementById(hookId);
      const p = new constructor();
      if (hookEl) {
        hookEl.innerHTML = template;
        hookEl.querySelector('h1')!.textContent = p.name;
      }
    };
  }

  @WithTemplate('<h1>My Person Object</h1>', 'app')
  class Person {
    name = 'Max';

    constructor() {
      console.log('Creating person object...');
    }
  }

  const person = new Person();

  console.log(person);
  ```

- 데코레이터를 사용할 수 있는 곳이라면 어디든지 1개 이상의 데코레이터를 추가할 수 있다.
  - 데코레이터의 실행 순서는 상향식으로, 밑에 있는 데코레이터가 먼저 실행된다. 하지만, 데코레이터 팩토리는 실행 순서가 다르다.  
    데코레이터 팩토리는 @ 기호가 있긴 해도 결국, 함수이기에 일반적인 규칙대로 실행이 된다.

## 속성 데코레이터

- 데코레이터는 클래스에 추가할 수 있으며, 다른 대상들에도 ㅜ가할 수 있다.
  - 인스턴스화 하는 곳이 없는 속성 데코레이터는 JS의 클래스 정의가 등록되는 시점에 실행된다.

```ts
function Log(target: any, propertName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertName);
}

class Product {
  @Log
  title: string;
  private _price: number;

  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price - should be positive!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}
```

## 접근자 매개변수 데코레이터

- 프로퍼티뿐만 아니라, 접근자에도 데코레이터를 추가할 수 있다.

  ```ts
  function Log(target: any, propertName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertName);
  }

  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }

  class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error('Invalid price - should be positive!');
      }
    }

    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }

    getPriceWithTax(tax: number) {
      return this._price * (1 + tax);
    }
  }
  ```

- 매개변수와 메서드에 데코레이터를 추가할 수 있다.

  - 메서드에 데코레이터를 추가하여 원하는 동작을 수행할 수 있다.
  - 매개변수에 데코레이터를 추가하여, 특정 매개변수에 대한 작업을 수행 할 수 있다.

  ```ts
  function Log(target: any, propertName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target, propertName);
  }

  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }

  function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
  }

  function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
  }

  class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error('Invalid price - should be positive!');
      }
    }

    constructor(t: string, p: number) {
      this.title = t;
      this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
      return this._price * (1 + tax);
    }
  }
  ```

## 데코레이터는 언제 실행 되는가?

- 위 모든 데코레이터는 Product를 인스턴스화 하지 않아도 실행된다.
  - 데코레이터는 클래스가 정의 될 때 실행 되는 함수로, 배후에서 부가적인 설정 작업을 수행할 수 있다.  
    데코레이터를 사용하여 메타데이터를 추가하거나 프로퍼티와 관련된 데이터를 저장할 수 있다.

## 클래스 데코레이터에서 클래스 반환 및 변경

- 데코레이터를 사용하여 클래스 데코레이터나 메서드 데코레이터에서 값을 반환할 수 있으며,  
  반환할 수 있는 값과 타입은 데코레이터의 종류에 따라다르다.

  - 데코레이터에서는 새로운 생성자 함수를 반환하여 기존 클래스를 대체할 수 있다.

- 데코레이터를 활용하면 클래스가 정의 될 때 데코레이터 함수가 실행되어 템플릿이 렌더링 되는 것을 방지할 수도 있다.

  - 생성자 함수 안에서 기존 로직과 새로운 로직을 추가할 수도 있다.

  ```ts
  function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function (constructor: Function) {
      console.log(logString);
      console.log(constructor);
    };
  }

  function WithTemplate(template: string, hookId: string) {
    console.log('TEMPLATE FACTORY');
    return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super();
          console.log('Rendering template');
          const hookEl = document.getElementById(hookId);
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = this.name;
          }
        }
      };
    };
  }

  @Logger('LOGGING')
  @WithTemplate('<h1>My Person Object</h1>', 'app')
  class Person {
    name = 'Max';

    constructor() {
      console.log('Creating person object...');
    }
  }

  // const person = new Person();

  // console.log(person);
  ```

## 기타 데코레이터 반환 타입

- 데코레이터 반환 값은 데코레이터가 추가된 메서드와 접근자에 사용될 수 있다.
  - 속성 데코레이터와 매개변수 데코레이터에서는 반환 값을 사용하지 않는다.
  - 메서드 데코레이터에서는 새로운 속성 설명자를 반환 할 수 있다.

```ts
class Printer {
  message = 'This works!';

  showMessage() {
    console.log(this.message); // undefined
  }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
```

- this 바인딩에 의해, showMessage는 undefined를 반환한다.
  - 그러므로, `bind`를 사용해 p를 바인딩할 것을 명시해야한다.

```ts
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
p.showMessage();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);
```

## 유효성 검증 데코레이터
