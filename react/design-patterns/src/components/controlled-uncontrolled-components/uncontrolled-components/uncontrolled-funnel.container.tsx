import UncontrolledFunnel from './uncontrolled-funnel';
import UncontrolledFunnelStep from './uncontrolled-funnel.step';

export default function UncontrolledFunnelContainer() {
  function doneStepHandler() {
    alert('Yaee, you made it to the final step');
  }

  return (
    <UncontrolledFunnel onDone={doneStepHandler}>
      <UncontrolledFunnelStep step={1} />
      <UncontrolledFunnelStep step={2} />
      <UncontrolledFunnelStep step={3} />
    </UncontrolledFunnel>
  );
}
