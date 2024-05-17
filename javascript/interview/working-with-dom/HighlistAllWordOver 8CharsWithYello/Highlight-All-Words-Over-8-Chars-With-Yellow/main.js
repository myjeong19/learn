// Highlight all of the words over 8 characters in the paragraph text
// (with a yellow background for example)

const paragraph = document.querySelector('p');
paragraph.innerHTML = paragraph.innerHTML
  .split(' ')
  .map(word => (word.length > 8 ? `<span style="background-color: yellow">${word}</span>` : word));
