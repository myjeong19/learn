import { MAX_CHARS } from '../utils/constans/index.js';
import { elementTextarea, elementTextCounter } from '../counter/index.js';
import { elementButtonSubmit } from './index.js';
import {
  getHashtag,
  getCompany,
  getBadgeLetter,
  insertElementFeedbackItem,
  showVisualIndicator,
} from './utils.js';

export default function hanlderSubmit(event) {
  // prevent default browser acion (submitting form data to 'action'-address and loading new page)
  event.preventDefault();

  // get text from textarea
  const text = elementTextarea.value;

  // validate text (e.g. check if #hashtag is present and text is long enough)
  if (text.includes('#') && text.length >= 5) {
    showVisualIndicator('valid');
  } else {
    showVisualIndicator('invalid');
    elementTextarea.focus();

    // stop this function execution
    return false;
  }

  // we have text, now extract other info from text
  const hashtag = getHashtag(text);
  const company = getCompany(hashtag);
  const badgeLetter = getBadgeLetter(company);
  const upvoteCount = 0;
  const daysAgo = 0;

  // new feedback item HTML
  insertElementFeedbackItem(text, company, badgeLetter, upvoteCount, daysAgo);

  // clear textarea
  elementTextarea.value = '';

  // blur submit button
  elementButtonSubmit.blur();

  // reset counter
  elementTextCounter.textContent = MAX_CHARS;
}
