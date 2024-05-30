// Write a function which checks if string is a palindrome
// fof

const isPalindrome = str => {
  return str === str.split('').reverse().join('');
};

console.log(isPalindrome('foo')); // false
console.log(isPalindrome('fof')); // true
