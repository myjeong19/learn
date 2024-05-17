// Create debounce function

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

function saveInput(name) {
  console.log('saveInput', name);
}

const processChange = debounce(saveInput, 1000);

processChange('foo');
processChange('foo');
processChange('foo');
processChange('foo');
