// short-circuiting with &&

const price = 1000;
if (price > 500 && price < 2000) {
  console.log('Price is between 500 and 2000');
}

price > 500 && console.log('Price is between 500 and 2000');

// short-ciurcuiting with ||
price > 500 || console.log('Price is not between 500 and 2000');
