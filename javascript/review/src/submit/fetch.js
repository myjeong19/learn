import { API_FEEDBACK } from '../utils/index.js';

async function postFeedbackItem(newFeedback) {
  try {
    const request = await fetch(API_FEEDBACK, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(newFeedback),
    });
    if (!request.ok) {
      throw new Error('Something went wrong');
    }

    console.log('Successfully submitted');
  } catch (error) {
    alert(error);
    throw new Error(error);
  }
}

export { postFeedbackItem };

// hello #starbucks i love your cappuuccinos
