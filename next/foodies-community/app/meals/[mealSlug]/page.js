import Image from 'next/image';

import classes from './css/page.module.css';
import { getMeal } from '@/lib/meal';
import { notFound } from 'next/navigation';
export default function MealDetailsPage({ params }) {
  let meal = getMeal(params.mealSlug);

  meal.instructions = meal.instructions.replace(/<p>/g, '').replace(/\n/g, '<br>');

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions,
          }}
        ></p>
      </main>
    </>
  );
}
