import { MAX_CHARS } from '../utils/constans/index.js';

import { elementTextarea, elementTextCounter } from './index.js';

export default function handlerInput() {
  // determine maximum number of characters

  // determine number of characters currently typed
  const nrCharsTyped = elementTextarea.value.length;

  // calculate number of characters left (maximum minus currently typed)
  const charsLeft = MAX_CHARS - nrCharsTyped;

  // show number of characters left
  elementTextCounter.textContent = charsLeft;
}
