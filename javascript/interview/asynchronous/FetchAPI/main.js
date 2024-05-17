// Write an example of fetching data using fetch API.
const url = 'https://api.github.com/users/gaearon/repos';

fetch(url, {
  method: 'GET',
})
  .then(response => response.json())
  .then(data => console.log('success', data))
  .catch(error => console.log('error', error));
