// Highlight all of the words over 8 characters in the paragraph text
// (with a yellow background for example)

const paragraph = document.querySelector('p');
paragraph.innerHTML = paragraph.innerHTML
  .split(' ')
  .map(word => (word.length > 8 ? `<span style="background-color: yellow">${word}</span>` : word));

// Add a link back to the source of the text after the paragraph tag.
const link = document.createElement('a');
link.href = 'https://foremipsum.com/';
link.innerText = 'Text generated from Lorem Ipsum';
document.body.appendChild(link);
