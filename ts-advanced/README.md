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
