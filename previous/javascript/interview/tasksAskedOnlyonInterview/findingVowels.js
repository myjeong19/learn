// Write a function which counts vowels in a string

const findVowels = str => {
  const vowels = ['a', 'e', 'o', 'i', 'u'];

  return str
    .toLowerCase()
    .split('')
    .reduce((acc, char) => (vowels.includes(char) ? acc + 1 : acc), 0);
};

console.log(findVowels('foo')); // 2
console.log(findVowels('gregregre')); // 3
