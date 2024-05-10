import {
  elCounter,
  elButtonIncrease,
  elButtonDecrease,
  elButtonReset,
  elCounterValue,
  elCounterTitle,
} from './elements.js';

function reset() {
  elCounterValue.textContent = '0';
  elCounterTitle.innerHTML = 'Fancy Counter';
  elCounter.classList.remove('counter--limit');
  elButtonIncrease.disabled = false;
  elButtonDecrease.disabled = false;
  elButtonReset.blur();
}

elButtonReset.addEventListener('click', reset);

function operatorHandler(operator) {
  const currentValue = elCounterValue.textContent;
  const currentValueAsNumber = +currentValue;

  const actions = {
    increase: currentValueAsNumber + 1,
    decrease: currentValueAsNumber - 1,
  };

  return actions[operator];
}

function limitInformation(element) {
  elCounter.classList.add('counter--limit');
  elCounterTitle.innerHTML = 'Limit! Buy <b>Pro</b> for > 5';
  element.disabled = true;
}

function actionHanlder(operator, elementButton) {
  const newValue = operatorHandler(operator);

  if (newValue < 0 || newValue > 5) {
    limitInformation(elementButton);
    return;
  }

  elCounterValue.textContent = newValue;
  elementButton.blur();
}

elButtonIncrease.addEventListener('click', () => actionHanlder('increase', elButtonIncrease));
elButtonDecrease.addEventListener('click', () => actionHanlder('decrease', elButtonDecrease));
