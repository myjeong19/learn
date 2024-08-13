import { useTimersContext } from '../store/timers-context.tsx';

import Button from './UI/Button.tsx';

export default function Header() {
  const { isRunning, startTimers, stopTimers } = useTimersContext();

  const onClickCondition = isRunning ? stopTimers : startTimers;

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={onClickCondition}>{isRunning ? 'Stop' : 'Start'} Timers</Button>
    </header>
  );
}
