import { useRef } from 'react';
import { type FormEvent } from 'react';

export type NewGoalProps = {
  onAddGoal: (goal: string, summary: string) => void;
};

export default function NewGoal({ onAddGoal }: NewGoalProps) {
  const refGoal = useRef<HTMLInputElement>(null);
  const refSummary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredGoal = refGoal.current!.value;
    const enteredSummary = refSummary.current!.value;

    event.currentTarget.reset();

    onAddGoal(enteredGoal, enteredSummary);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your goal</label>
        <input id="goal" type="text" ref={refGoal} />
      </p>
      <p>
        <label htmlFor="summary">Short summary</label>
        <input id="summary" type="text" ref={refSummary} />
      </p>
      <p>
        <button>Add Goal</button>
      </p>
    </form>
  );
}
