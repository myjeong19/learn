import { ReactNode } from 'react';

import CourseGoal from './CourseGoal';
import InfoBox from './InfoBox';

import { CourseGoal as TypeCourseGoal } from '../utils/types/CourseGoal';

type CourseGoalListProps = {
  goals: TypeCourseGoal[];
  onDelete: (goalId: number) => void;
};

export default function CourseGoalList({ goals, onDelete }: CourseGoalListProps) {
  if (goals.length === 0) {
    return <InfoBox mode="hint">You have no course goals yet. Start adding some!</InfoBox>;
  }

  let warningBox: ReactNode;

  if (goals.length >= 4) {
    warningBox = (
      <InfoBox mode="warning" severity="medium">
        You're collecting a lot of goals. Don't put too much on your plate!
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      <ul>
        {goals.map(({ id, title, description }: TypeCourseGoal) => (
          <li key={id}>
            <CourseGoal title={title} id={id} onDelete={onDelete}>
              <p>{description}</p>
            </CourseGoal>
          </li>
        ))}
      </ul>
    </>
  );
}
