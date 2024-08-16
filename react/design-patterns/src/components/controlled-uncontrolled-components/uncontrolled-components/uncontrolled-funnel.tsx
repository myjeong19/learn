import React from 'react';

import { useState } from 'react';
import { type Data } from './uncontrolled-funnel.step';

type ComponentProps = {
  data: Data;
  nextStepHandler: (data: Data) => void;
};

type UncontrolledFunnelProps = {
  children: React.ReactElement<ComponentProps>[];
  onDone: () => void;
};

export default function UncontrolledFunnel(props: UncontrolledFunnelProps) {
  const { children, onDone } = props;

  const [data, setData] = useState<Data>({ name: 'Kang' });
  const [currentStep, setCurrentStep] = useState<number>(0);

  function nextStepHandler(dataFromStep: Data) {
    const nextStep = currentStep + 1;

    const newData = {
      ...data,
      ...dataFromStep,
    };

    console.log(newData);

    if (nextStep < children.length) {
      setCurrentStep(nextStep);
    } else {
      onDone();
    }

    setData(newData);
  }

  const currentChild = React.Children.toArray(children)[
    currentStep
  ] as React.ReactElement<ComponentProps>;

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { nextStepHandler, data });
  }

  return currentChild;
}
