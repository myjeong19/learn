// Question 1
// console.log(foo);
// foo = 1;
// ReferenceError: foo is not defined
// Foo가 선언되지 않았기 때문에 ReferenceError가 발생함

// Question 2
// console.log(foo);
// var foo = 2;
// undefined
// 변수 foo가 선언되었지만 초기화되지 않았기 때문에 undefined가 출력됨
// 이 과정을 hoisting이라고 함.

// Question 3
// foo = 3;
// console.log(foo);
// var foo;
// 3
// foo가 hoisting되어 선언된 후 3으로 초기화되었기 때문에 3이 출력됨

// Question 4
foo();
function foo() {}
