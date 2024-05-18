import { elementFeedbackList } from '../submit/element.js';
import { createFeedbackTemplate } from './template.js';

export function insertElementFeedbackItem(upvoteCount, badgeLetter, company, text, daysAgo) {
  const feedbackItem = createFeedbackTemplate(upvoteCount, badgeLetter, company, text, daysAgo);

  elementFeedbackList.insertAdjacentHTML('beforeend', feedbackItem);
}
