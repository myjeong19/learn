import { elementTextarea, elementTextCounter } from './index.js';

export default function handlerInput() {
  // determine maximum number of characters
  const maxNrChars = 150;

  // determine number of characters currently typed
  const nrCharsTyped = elementTextarea.value.length;

  // calculate number of characters left (maximum minus currently typed)
  const charsLeft = maxNrChars - nrCharsTyped;

  // show number of characters left
  elementTextCounter.textContent = charsLeft;
}
