function daysAgoInformation(daysAgo) {
  return daysAgo === 0 ? 'NEW' : `${daysAgo}d`;
}

export function createFeedbackTemplate({ upvoteCount, badgeLetter, company, text, daysAgo }) {
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

  return htmlFeedbackItem;
}
