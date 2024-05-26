// Design a utility which takes URL and a value for attempts which will attempt to make a fetch request.
// If on failure it tries again with increasing delay for number of times which user has requested

const requestManager = (url, options = {}, attempts = 3) =>
  new Promise((resolve, reject) => {
    fetch(url, options)
      .then(resolve)
      .catch(error => {
        const isLastAttempt = attempts === 1;
        if (isLastAttempt) {
          return reject(error);
        }
        setTimeout(() => {
          requestManager(url, options, attempts - 1)
            .then(resolve)
            .catch(reject);
        }, 3000 * attempts);
      });
  });

requestManager('https://foo.com', {}, 3).then(response => console.log('response', response));
