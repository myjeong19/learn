import { elementFeedbackList } from '../submit/element.js';
import { createFeedbackTemplate } from './template.js';

export function insertElementFeedbackItem(newFeedback) {
  const feedbackItem = createFeedbackTemplate(newFeedback);

  elementFeedbackList.insertAdjacentHTML('beforeend', feedbackItem);
}
