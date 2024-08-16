import React from 'react';

import { type Data } from './controlled-funnel.step';

type ComponentProps = {
  onNext: (data: Data) => void;
  data: Data;
  currentStep: number;
};

type UncontrolledFunnelProps = {
  children: React.ReactElement<ComponentProps>[];
  currentStep: number;
  onNext: (data: Data) => void;
  data: Data;
};

export default function ControlledFunnel(props: UncontrolledFunnelProps) {
  const { children, currentStep, onNext, data } = props;

  const currentChild = React.Children.toArray(children)[
    currentStep
  ] as React.ReactElement<ComponentProps>;

  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { onNext, data, currentStep });
  }

  return currentChild;
}
