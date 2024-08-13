import { API_FEEDBACK } from '../utils/index.js';
import { elementSpinner } from './element.js';

export async function getFeedbackList() {
  try {
    const response = await fetch(API_FEEDBACK, { method: 'GET' });
    elementSpinner.remove();

    const { feedbacks } = await response.json();
    return feedbacks;
  } catch (error) {
    alert('Failed to fetch feedback items. Error message');
    throw new Error(error);
  }
}
