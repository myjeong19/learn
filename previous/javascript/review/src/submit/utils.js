import { elementForm } from './element.js';

function removeDelayClass(className, timer = 2000) {
  setTimeout(() => elementForm.classList.remove(className), timer);
}

function showVisualIndicator(textCheck) {
  const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

  elementForm.classList.add(className);
  removeDelayClass(className);
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

export { getHashtag, getCompany, getBadgeLetter, showVisualIndicator };
