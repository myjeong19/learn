// Write an example of fetching data with XMLHttpRequest.

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.github.com/users/gaearon/repos');

xhr.send();

xhr.onload = function () {
  if (xhr.status != 200) {
    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    console.log('Success', xhr.response);
  }
};

xhr.onerror = function () {
  console.log('xhr request failed');
};
