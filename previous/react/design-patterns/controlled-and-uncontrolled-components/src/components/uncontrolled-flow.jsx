import { useState, Children, isValidElement, cloneElement } from 'react';

export const UncontrolledFlow = ({ children, onDone }) => {
  const [data, setData] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentChild = Children.toArray(children)[currentStepIndex];

  const next = dataFromStep => {
    const nextStepIndex = currentStepIndex + 1;

    const newData = {
      ...data,
      ...dataFromStep,
    };

    if (nextStepIndex < children.length) {
      setCurrentStepIndex(nextStepIndex);
    } else {
      onDone(newData);
    }

    setData(newData);

    setCurrentStepIndex(currentStepIndex + 1);
  };

  if (isValidElement(currentChild)) {
    return cloneElement(currentChild, { next });
  }

  return currentChild;
};
