//  성능과 호환성 이유로, 일부 서버는 JavaScript로 작성되지 않는다.

fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))
  .catch(error => {
    throw new Error('Error:', error);
  });
