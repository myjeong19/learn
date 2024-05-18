function handlerClick(event) {
  const elementClicked = event.target;

  //   determine if user intended to upvote or expand

  const upvoteIntention = elementClicked.className.includes('upvote');

  //   run the approproate logic
  if (upvoteIntention) {
    // get the closest upvote button
    const elementUpvoteButton = elementClicked.closest('.upvote');

    // disable upvote button (prevent doble-click, spam)
    elementUpvoteButton.disabled = true;

    // select the upvote count element within the upvote button
    const elementUpvoteCount = elementUpvoteButton.querySelector('.upvote__count');

    // get currently displayed upvote count
    let upvoteCounte = +elementUpvoteCount.textContent;

    // set upvote count increment by 1
    elementUpvoteCount.textContent = ++upvoteCounte;
  } else {
    // expand the clicked feedback item
    elementClicked.closest('.feedback').classList.toggle('feedback--expand');
  }
}

export { handlerClick };
