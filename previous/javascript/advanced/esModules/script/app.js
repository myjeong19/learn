import { BASE_API_URL } from './utillties.js';
import convertCurrency from './utillties.js';

const euroAmount = convertCurrency(233);

fetch(`${BASE_API_URL}/books/4`);
