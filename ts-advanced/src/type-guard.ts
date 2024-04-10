type Combinable = string | number;

function add(n1: Combinable, n2: Combinable) {
  if (typeof n1 === 'string' || typeof n2 === 'string') {
    return n1.toString() + n2.toString();
  }
  return n1 + n2;
}

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = { name: string; startDate: Date };
type ElevatedEmployee = Admin & Employee;
type UnkbownEmployee = Admin | Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

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

useVehicle(v1);
useVehicle(v2);
