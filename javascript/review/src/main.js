import { elementTextarea, handlerInput } from './counter/index.js';
import { elementForm, hanlderSubmit } from './submit/index.js';
import { renderFeedbackList } from './feedback/index.js';

// limit maximum number of characters 150
elementTextarea.addEventListener('input', handlerInput);

// Submit form
elementForm.addEventListener('submit', hanlderSubmit);

renderFeedbackList();
