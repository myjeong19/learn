// Sort the array of numbers

const numbers = [2, 1, 3, 5, 4];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4, 5]

const books = [
  { name: 'Harry Potter', author: 'Joanne Rowling' },
  { name: 'Warcross', author: 'Marie Lu' },
  { name: 'The Hunger Games', author: 'Suzanne Collins' },
];

books.sort((book1, book2) => {
  const authorLastName1 = book1.author.split(' ')[1];
  const authorLastName2 = book2.author.split(' ')[1];
  return authorLastName1 < authorLastName2 ? -1 : 1;
});

console.log(books);

// or

// books.sort((a, b) => b.author.localeCompare(a.author));
// console.log(books);
