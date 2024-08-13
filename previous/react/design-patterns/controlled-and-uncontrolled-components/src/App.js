import { useState } from 'react';

// import { useState } from 'react';
// import { UncontrolledForm } from "./components/uncontrolled-form";
// import { ControlledForm } from './components/controlled-form';
// import { ControlledModal } from './components/controlled-modal';

// import { UncontrolledFlow } from './components/uncontrolled-flow';
import { ControlledFlow } from './components/controlled-flow';

const StepOne = ({ next }) => {
  return (
    <>
      <h1>Step #1: Enter your name:</h1>
      <button onClick={() => next({ name: 'MyName' })}>Next</button>
    </>
  );
};
const StepTwo = ({ next }) => {
  return (
    <>
      <h1>Step #2: Enter your age:</h1>
      <button onClick={() => next({ age: 23 })}>Next</button>
    </>
  );
};
const StepThree = ({ next }) => {
  return (
    <>
      <h1>Step #3: Enter your country:</h1>
      <button onClick={() => next({ country: 'KR' })}>Next</button>
    </>
  );
};

const StepFour = ({ next }) => {
  return (
    <>
      <h1>Step #4: Enter your country</h1>
      <button onClick={() => next({ country: 'Poland' })}>Next</button>
    </>
  );
};

function App() {
  // const [shouldDisplay, setShouldDisplay] = useState(false);

  const [data, setData] = useState({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = dataFromStep => {
    setData({ ...data, ...dataFromStep });
    setCurrentStepIndex(currentStepIndex + 1);
  };

  return (
    <>
      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}

      {/* <ControlledModal shouldShow={shouldDisplay} close={() => setShouldDisplay(false)}>
        <h3>I am the body of the modal!!!</h3>
      </ControlledModal>
      <button type="button" onClick={() => setShouldDisplay(prev => !prev)}>
        {shouldDisplay ? 'Hide' : 'Show'}
      </button> */}

      {/* <UncontrolledFlow onDone={data => alert('Yaee, you mate it to the final step!' + '' + data)}>
        <StepOne />
        <StepTwo />
        <StepThree />
      </UncontrolledFlow> */}

      <ControlledFlow currentStepIndex={currentStepIndex} next={next}>
        <StepOne />
        <StepTwo />
        {data.age > 25 && <StepThree />}
        <StepFour />
      </ControlledFlow>
    </>
  );
}

export default App;
