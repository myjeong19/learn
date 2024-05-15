// Write a function which implements shuffle

function shuffleFunction(items) {
  return (
    items
      .map(item => ({ sort: Math.random(), value: item }))
      // 모든 단일 요소에 접근해, 무작위한 숫자 할당
      .sort((item1, item2) => item1.sort - item2.sort)
      //   할당된 숫자를 기준으로 정렬
      .map(a => a.value)
    // 정렬된 객체에서 원래의 값(value)만 추출
  );
}

console.log(shuffleFunction([1, 2, 3]));
