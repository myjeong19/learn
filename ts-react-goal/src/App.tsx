import { useState } from 'react';

import { TypeCourseGoal } from './utils/types/TypeCourseGoal.ts';

import Header from './components/Header.tsx';
import CourseGoalList from './components/CourseGoalList.tsx';
import golasImage from './assets/goals.jpg';

export default function App() {
  const [goals, setGoals] = useState<TypeCourseGoal[]>([]);

  function handleAddGoal() {
    setGoals(prevGoals => {
      const newGoal: TypeCourseGoal = {
        id: Math.random(),
        title: 'Learn React + TS',
        description: 'Learn it in depth!',
      };

      return [...prevGoals, newGoal];
    });
  }

  function handleDeleteGoal(goalId: number) {
    setGoals(prevGoals => {
      return prevGoals.filter(goal => goal.id !== goalId);
    });
  }

  return (
    <main>
      <Header image={{ src: golasImage, alt: 'A list of goals' }}>
        <h1>Your Course Goals</h1>
      </Header>
      <section>
        <button onClick={handleAddGoal}>Add Goal</button>
      </section>

      <CourseGoalList goals={goals} onDelete={handleDeleteGoal} />
    </main>
  );
}
