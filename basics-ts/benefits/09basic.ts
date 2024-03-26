function literal(resultConversion: "STRING" | "text") {
  return resultConversion;
}

// const literalResult = literal("TEXT");
// console.log(literalResult); // Argument of type '"TEXT"' is not assignable to parameter of type '"STRING"'.

const literalResult = literal("STRING");
console.log(literalResult); // STRING
