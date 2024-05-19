import { elementFeedbackList } from '../feedback/index.js';

function handlerClick(event) {
  // get the clicked element
  const elementClicked = event.target;
  console.log(elementClicked);

  //   stop function if click happend in list, but outside buttons
  if (elementClicked.className === 'hashtags') {
    return false;
  }

  //   extract company name
  const companyNameFromHashtag = elementClicked.textContent.substring(1).toLowerCase().trim();

  //   iterate over each feedback item in the list
  elementFeedbackList.childNodes.forEach(childNode => {
    if (childNode.nodeType === 3) {
      // stop this iteration if it's a text node
      return false;
    }
    // extract company name
    const companyNameFromFeedbackItem = childNode
      .querySelector('.feedback__company')
      .textContent.toLowerCase()
      .trim();

    // remove feedback item from list if company names are not equal
    if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
      childNode.remove();
    }
  });
}

export { handlerClick };
