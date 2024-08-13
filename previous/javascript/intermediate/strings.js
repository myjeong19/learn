const text = 'Hello everyone!';

// length (number of characters)
console.log(text.length);

// includes()
// return Boolean
console.log(text.includes('Hello')); // true

// toUppercase()
console.log(text.toUpperCase()); // HELLO EVERYONE!

// trim()
console.log(text.trim()); // Helloeveryone!

// substring()
console.log(text.substring(0, 4)); // Hell
console.log(text.substring(0, 5)); // Hello

// chaining
const result = text.toUpperCase().trim().substring(4);
console.log(result); // O EVERYONE!
