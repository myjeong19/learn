import { elementTextarea, handlerInput } from './counter/index.js';

// limit maximum number of characters 150
elementTextarea.addEventListener('input', handlerInput);
