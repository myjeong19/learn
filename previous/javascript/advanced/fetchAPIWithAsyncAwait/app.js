const elementButton = document.querySelector('.btn');
const newUser = {
  name: 'John Doe',
  job: 'Software Developer',
};

async function clickHandler() {
  try {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log(data.data[3].first_name);
  } catch (error) {
    console.log(error);
  }

  //   fetch('https://reqres.in/api/users')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       response.json();
  //     })
  //     .then(data => console.log(data.data[3].first_name))
  //     .catch(error => console.log(error));
}

elementButton.addEventListener('click', clickHandler);
