const privateCounter = () => {
  let count = 0;

  //   public pay 공공 급여
  //   함수를 호출한 후 이 함수 내에서 count 변수에 액세스할 수 있음을 의미한다.
  return {
    increment: (val = 1) => {
      count += val;
    },
    getValue: () => count,
  };
};

const counter = privateCounter();
console.log(counter.getValue()); // 0
counter.increment();
console.log(counter.getValue()); // 1

console.dir(counter.getValue); // [Function: getValue]

// 클로저는 함수 내부에서 외부 범위에 액세스할 수 있음을 의미한다.
// 클로저를 이용하면, 외부에서 접근할 수 있는 private한 변수를 생성할 수 있다.

const privateSecret = () => {
  const secret = 'foo';

  return () => secret;
};

const getSecret = privateSecret();
console.log(getSecret()); // foo
