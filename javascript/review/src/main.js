import { elementTextarea, handlerInput } from './counter/index.js';
import { elementForm, hanlderSubmit } from './submit/index.js';
import {
  renderFeedbackList,
  elementFeedbackList,
  handlerClick as feedbackClick,
} from './feedback/index.js';
import { elementHashtagList, handlerClick as hashtagClick } from './hashtag/index.js';

// limit maximum number of characters 150
elementTextarea.addEventListener('input', handlerInput);

// Submit form
elementForm.addEventListener('submit', hanlderSubmit);

renderFeedbackList();

elementFeedbackList.addEventListener('click', feedbackClick);

elementHashtagList.addEventListener('click', hashtagClick);
