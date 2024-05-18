import { elementFeedbackList } from '../feedback/index.js';
import { createFeedbackTemplate } from './template.js';

export function insertElementFeedbackItem(newFeedback) {
  const feedbackItem = createFeedbackTemplate(newFeedback);

  elementFeedbackList.insertAdjacentHTML('beforeend', feedbackItem);
}
