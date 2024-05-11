const text = 'Map of NYC';

if (text.includes('NYC')) {
  console.log(100);
} else {
  console.log('test');
}
// 100

if (!text.includes('NYC')) {
  console.log(100);
} else {
  console.log('test');
}
// test

// Server response
const response = {
  statusCode: 500,
  ok: false,
  data: [1, 2, 3],
};

if (!response.ok) {
  throw new Error('Server error');
}
