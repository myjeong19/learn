import { useState } from 'react';
import ControlledFunnelStep, { type Data } from './controlled-funnel.step';
import ControlledFunnel from './controlled-funnel';

export const names: Data[] = [
  {
    name: 'Kang',
  },
  {
    name: 'Hae',
  },
  {
    name: 'Rin',
  },
];

export default function ControlledFunnelContainer() {
  const [data, setData] = useState<Data[]>(names);
  const [currentStep, setCurrentStep] = useState<number>(0);

  function nextStepHandler(dataFromStep: Data) {
    console.log('onNext', currentStep);
    setCurrentStep(prev => prev + 1);
    setData(prev => {
      return { ...prev, ...dataFromStep };
    });

    if (names.length === currentStep + 1) {
      doneStepHandler();
      setCurrentStep(0);
    }
  }
  function doneStepHandler() {
    alert('Yaee, you made it to the final step');
  }

  return (
    <ControlledFunnel currentStep={currentStep} onNext={nextStepHandler} data={data[currentStep]}>
      <ControlledFunnelStep />
      <ControlledFunnelStep />
      <ControlledFunnelStep />
    </ControlledFunnel>
  );
}
