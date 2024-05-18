import { elementTextarea } from './counter/element.js';
import handlerInput from './counter/handler.js';

// limit maximum number of characters 150
elementTextarea.addEventListener('input', handlerInput);
