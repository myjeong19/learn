// Design the samne classes by using only JavaScript prototypes

var Employee = function (id, name) {
  if (!id || !name) {
    throw new Error('Employee id and name are mandatory');
  }
  this.id = id;
  this.name = name;
};

Employee.prototype.setSalary = function (salary) {
  this.salary = salary;
};

Employee.prototype.getId = function () {
  return this.id;
};

Employee.prototype.getName = function () {
  return this.name;
};

Employee.prototype.getSalary = function () {
  return this.salary;
};

const employee = new Employee(1, 'John Doe');
employee.setSalary(1000);
console.log(employee); // Employee { id: 1, name: 'John Doe', salary: 1000 }

var Manager = function (params) {
  Employee.call(this, arguments);
};

console.log(Manager.prototype); // {}
Manager.prototype = Object.create(Employee.prototype);
console.log(Manager.prototype); // Employee {}

console.log(Manager.prototype.constructor); // [Function: Employee]
Manager.prototype.constructor = Manager; // [Function: Manager]
console.log(Manager.prototype.constructor);

Manager.prototype.setDepartment = function (name) {
  this.department = name;
};

Manager.prototype.getDepartment = function () {
  return this.department;
};
