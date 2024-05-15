// What will be logged here?

// Task 1
function getItem() {
  console.log(this);
}

getItem();

// 함수 내부에서 this는 전역 객체를 가리킨다. 브라우저 환경에서는 window 객체를 가리킨다.
// 하지만 function 키워드를 직접 정의하는 경우,window를 가르키게 된다.

// Task 2
// const item = {
//   title: 'Ball',
//   getItem() {
//     console.log('this', this);
//   },
// };

// item.getItem();

// 객체 내부에서 this를 사용하는 경우, 모든 속성을 사용할 수 있다.
// 따라서, 객체 내부 this는 항상 객체를 참조한다.

// Task 3
// class Item {
//   title = 'Ball';
//   getItem() {
//     console.log('this', this);
//   }
// }

// const item = new Item();
// item.getItem();
// 클래스 내부 this는 항상 인스턴스를 참조한다.

// Task 4
// 함수 내부에 함수를 선언하면 this는 정의한 인스턴스를 참조하지 않는다.
class Item {
  title = 'Ball';
  getItem() {
    [1, 2, 3].map(function (item) {
      console.log(this);
    });

    // function someFn() {
    //   console.log('this', this); // undefined
    // }
    // someFn();
  }
}

const item = new Item();
item.getItem();

// 이에 대한 해결 방법은 다음 두 가지가 있다.
// 1. this_ = this; 를 사용하여 this를 다른 변수에 할당한다.
class Item {
  title = 'Ball';
  getItem() {
    const this_ = this;
    [(1, 2, 3)].map(function (item) {
      console.log(this_); // Item { title: 'Ball' }
    });

    // function someFn() {
    //   console.log('this', this); // undefined
    // }
    // someFn();
  }
}

// 2. 화살표 함수를 사용한다.
class Item {
  title = 'Ball';
  getItem() {
    [1, 2, 3].map(
      item => console.log(this) // Item { title: 'Ball' }
    );

    // const someFn = () => {
    //   console.log('this', this); // Item { title: 'Ball' }
    // };
    // someFn();
  }
}
