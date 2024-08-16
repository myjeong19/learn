export type Data = {
  name: string;
};

type StepContainerProps = {
  currentStep?: number;
  onNext?: () => void;
  data?: Data;
};

export default function ControlledFunnelStep(props: StepContainerProps) {
  const { currentStep, onNext, data: stepData } = props;

  function passData() {
    if (!onNext) {
      return false;
    }
    onNext();
  }

  return (
    <>
      <h1>Step #{currentStep}</h1>
      <p>{stepData && stepData.name}</p>
      <button onClick={passData}>NEXT STEP</button>
    </>
  );
}
