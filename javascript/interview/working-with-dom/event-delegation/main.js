// Implement a click on todo item as fast as possible

// function handleClick(item) {
//   console.log('you clicked on item' + item.innerText);
// }

// const items = document.querySelectorAll('.item');
// items.forEach(item => item.addEventListener('click', handleClick.bind(this, item)));

const app = document.querySelector('.todo-app');

function handleClick(event) {
  if (event.target && event.target.classList.contains('item')) {
    console.log('you clicked on item:' + event.target.innerText);
  }
}
app.addEventListener('click', handleClick);
