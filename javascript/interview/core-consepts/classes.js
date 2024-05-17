// Design a class for employee which takes name in during construction of object and has a salary property.

class Employee {
  constructor(id, name) {
    if (!id || !name) {
      throw new Error('Employee id and name are mandatory');
    }
    this.id = id;
    this.name = name;
  }

  setSalary(salary) {
    this.salary = salary;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getSalary() {
    return this.salary;
  }
}

const employee = new Employee(1, 'John Doe');
employee.setSalary(1000);
console.log(employee); // Employee { id: 1, name: 'John Doe', salary: 1000 }

class Manager extends Employee {
  setDepartment(name) {
    this.department = name;
  }

  getDepartment() {
    return this.department;
  }
}

const manager = new Manager(2, 'Jane Doe');
manager.setSalary(2000);
manager.setDepartment('IT');
console.log(manager); // Manager { id: 2, name: 'Jane Doe', salary: 2000, department: 'IT' }
