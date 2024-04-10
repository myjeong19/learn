// const paragraph = document.querySelector('p');

// const userInput = document.getElementById('user-input')!;

// userInput.value = 'Hi there!';
// ERROR: 'HTMLElememnt' 형식에 'value' 속성이 없습니다.

// const userInput = <HTMLInputElement>document.getElementById('user-input')!;
// const userInput = document.getElementById('user-input')! as HTMLInputElement;
// userInput.value = 'Hi there!';

const userInputElement = document.getElementById('user-input');

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}
