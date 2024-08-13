type Combinable = number | string;
type STRING = "STRING" | "string";

function combine(input1: Combinable, input2: Combinable, input3: STRING) {
  // const result = input1 + input2; // '+' 연산자를 'string | number' 및 'string | number' 형식에 적용할 수 없습니다.ts(2365)
  let result: number | string;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, "STRING");
console.log(combinedAges);
