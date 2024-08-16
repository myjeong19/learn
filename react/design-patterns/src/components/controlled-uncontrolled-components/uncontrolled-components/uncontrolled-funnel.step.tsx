export type Data = {
  name: string;
};

const data: Data[] = [
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

type StepContainerProps = {
  step?: number;
  nextStepHandler?: (data: Data) => void;
  data?: Data;
};

export default function UncontrolledFunnelStep(props: StepContainerProps) {
  const { step, nextStepHandler, data: stepData } = props;

  function passData() {
    if (!(nextStepHandler && step)) {
      return false;
    }
    nextStepHandler(data[step]);
  }

  return (
    <>
      <h1>Step #{step}</h1>
      <p>{stepData && stepData.name}</p>
      <button onClick={passData}>NEXT STEP</button>
    </>
  );
}
