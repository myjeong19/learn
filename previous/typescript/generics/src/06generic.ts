interface CoursGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, data: Date): CoursGoal {
  let courseGoal: Partial<CoursGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = data;

  return courseGoal as CoursGoal;
}

const names: Readonly<string[]> = ['Max', 'Sports'];
name.push('Manu'); // ERRROR
