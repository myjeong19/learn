import { elementForm, elementFeedbackList } from './element.js';

function removeDelayClass(className, timer = 2000) {
  setTimeout(() => elementForm.classList.remove(className), timer);
}

function getHashtag(text) {
  return text.split(' ').find(word => word.includes('#'));
}

function getCompany(hashtag) {
  return hashtag.substring(1);
}

function getBadgeLetter(company) {
  return company.substring(0, 1).toUpperCase();
}

function daysAgoInformation(daysAgo) {
  return daysAgo === 0 ? 'NEW' : `${daysAgo}d`;
}

function insertElementFeedbackItem(text, company, badgeLetter, upvoteCount, daysAgo) {
  const htmlFeedbackItem = `
  <li class="feedback">
    <button class="upvote">
       <i class="fa-solid fa-caret-up upvote__icon"></i>
       <span class="upvote__count">${upvoteCount}</span>
    </button>
    <section class="feedback__badge">
      <p class="feedback__letter">${badgeLetter}</p>
    </section>
    <div class="feedback__content">
       <p class="feedback__company">${company}</p>
       <p class="feedback__text">${text}</p>
    </div>
    <p class="feedback__date">${daysAgoInformation(daysAgo)}</p>
    </li>
  `;

  elementFeedbackList.insertAdjacentHTML('beforeend', htmlFeedbackItem);
}

export { removeDelayClass, getHashtag, getCompany, getBadgeLetter, insertElementFeedbackItem };
