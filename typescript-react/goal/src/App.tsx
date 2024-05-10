import { useState } from 'react';

import { CourseGoal as CourseGoalType } from './utils/types/CourseGoal.ts';

import Header from './components/Header.tsx';
import CourseGoalList from './components/CourseGoalList.tsx';
import golasImage from './assets/goals.jpg';
import NewGoal from './components/NewGoal.tsx';

export default function App() {
  const [goals, setGoals] = useState<CourseGoalType[]>([]);

  function handleAddGoal(goal: string, summary: string) {
    setGoals(prevGoals => {
      const newGoal: CourseGoalType = {
        id: Math.random(),
        title: goal,
        description: summary,
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
        <NewGoal onAddGoal={handleAddGoal} />
      </section>

      <CourseGoalList goals={goals} onDelete={handleDeleteGoal} />
    </main>
  );
}
