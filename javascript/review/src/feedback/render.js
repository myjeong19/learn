import { getFeedbackList } from './fetch.js';
import { insertElementFeedbackItem } from '../utils/index.js';

async function renderFeedbackList() {
  const feedbackList = await getFeedbackList();

  feedbackList.map(({ upvoteCount, badgeLetter, company, text, daysAgo }) =>
    insertElementFeedbackItem(upvoteCount, badgeLetter, company, text, daysAgo)
  );
}
export { renderFeedbackList };
