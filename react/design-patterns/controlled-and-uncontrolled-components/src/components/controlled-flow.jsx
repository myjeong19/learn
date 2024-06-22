import { Children, cloneElement, isValidElement } from 'react';

export const ControlledFlow = ({ children, onDone, currentStepIndex, next }) => {
  const currentChild = Children.toArray(children)[currentStepIndex];

  if (isValidElement(currentChild)) {
    return cloneElement(currentChild, { next });
  }

  return currentChild;
};
