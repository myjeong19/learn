import { getFeedbackList } from './fetch.js';
import { insertElementFeedbackItem } from '../utils/index.js';

async function renderFeedbackList() {
  const feedbackList = await getFeedbackList();

  feedbackList.map(newFeedback => insertElementFeedbackItem(newFeedback));
}
export { renderFeedbackList };
