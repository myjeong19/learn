// Execute the given list of asynchronous functions in parallel and return the results as an array to the callback

const asyncFunc1 = callback => {
  setTimeout(() => {
    callback(1);
  }, 3000);
};

const asyncFunc2 = callback => {
  setTimeout(() => {
    callback(2);
  }, 2000);
};

const asyncFunc3 = callback => {
  setTimeout(() => {
    callback(3);
  }, 1000);
};

const asyncParallel = (asyncFuncs, callback) => {
  const resultArr = new Array(asyncFuncs.length);
  let resultCounter = 0;

  // 비동기 함수를 반복하면서 모든 단일 함수 호출
  asyncFuncs.forEach((asyncFunc, index) => {
    asyncFunc(value => {
      resultArr[index] = value;
      resultCounter++;
      if (resultCounter === asyncFuncs.length) {
        callback(resultArr);
      }
    });
  });
};

asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], result => {
  console.log(result); // 1, 2, 3 (prints results of each asynchronous function in order)
});

//  비동기 작업을 병렬로 실행하여 처리 속도를 향상시킬 수 있으며, 특히 대량의 데이터를 처리할 때 효과적이다.
