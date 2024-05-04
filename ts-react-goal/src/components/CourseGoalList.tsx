import CourseGoal from './CourseGoal';

import { TypeCourseGoal } from '../utils/types/TypeCourseGoal';

type CourseGoalListProps = {
  goals: TypeCourseGoal[];
  onDelete: (goalId: number) => void;
};

export default function CourseGoalList({ goals, onDelete }: CourseGoalListProps) {
  return (
    <ul>
      {goals.map(({ id, title, description }: TypeCourseGoal) => (
        <li key={id}>
          <CourseGoal title={title} id={id} onDelete={onDelete}>
            <p>{description}</p>
          </CourseGoal>
        </li>
      ))}
    </ul>
  );
}
