function tsTypeAddResult(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    console.log(phrase + (n1 + n2));
  }
}

let firstNumber = 5;
const secondNumber = 2.8;
const isResult = true;
const phrase = "Reulst:";

tsTypeAddResult(firstNumber, secondNumber, isResult, phrase);
