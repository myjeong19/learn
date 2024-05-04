import CourseGoal from './CourseGoal';

import { CourseGoal as TypeCourseGoal } from '../utils/types/CourseGoal';

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
