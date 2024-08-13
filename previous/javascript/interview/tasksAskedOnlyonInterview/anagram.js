// Write a function which checks if string is an anagram

// Anagrams are words that have the same characters in the same quantity. This means that two strings are anagrams if we can rearrange one to get the other.
// Here are some examples of words that are anagrams.
// “listen” and “silent”
// “rail safety” and “fairy tales”
// “dormitory” and “dirty room”
// “the eyes” and “they see”

const getLowerCase = string => string.toLowerCase();
const getSortJoin = string => string.split('').sort().join('');

const isAnagram = (str1, str2) => {
  if (str1.length !== str2.length) {
    return false;
  }

  const lowerStr1 = getLowerCase(str1);
  const lowerStr2 = getLowerCase(str2);

  if (lowerStr1 === lowerStr2) {
    return false;
  }

  const sortedStr1 = getSortJoin(lowerStr1);
  const sortedStr2 = getSortJoin(lowerStr2);

  return sortedStr1 === sortedStr2;
};

console.log(isAnagram('listen', 'bar')); // false
console.log(isAnagram('listen', 'silent')); // true
