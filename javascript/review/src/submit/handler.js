import { elementTextarea, elementTextCounter } from '../counter/index.js';
import { elementForm, elementButtonSubmit } from './index.js';
import {
  removeDelayClass,
  getHashtag,
  getCompany,
  getBadgeLetter,
  insertElementFeedbackItem,
} from './utils.js';

export default function hanlderSubmit(event) {
  // prevent default browser acion (submitting form data to 'action'-address and loading new page)
  event.preventDefault();

  // get text from textarea
  const text = elementTextarea.value;

  // validate text (e.g. check if #hashtag is present and text is long enough)
  if (text.includes('#') && text.length >= 5) {
    elementForm.classList.add('form--valid');
    removeDelayClass('form--valid');
  } else {
    elementForm.classList.add('form--invalid');
    removeDelayClass('form--invalid');
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
  elementTextCounter.textContent = '150';
}
