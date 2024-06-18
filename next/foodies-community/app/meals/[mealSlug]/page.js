import Image from 'next/image';

import classes from './css/page.module.css';
import { getMeal } from '@/lib/meal';
export default function MealDetailsPage({ params }) {
  let { title, image, creator_email, creator, summary, instructions } = getMeal(params.mealSlug);

  instructions = instructions.replace(/<p>/g, '').replace(/\n/g, '<br>');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={image} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${creator_email}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: instructions,
          }}
        ></p>
      </main>
    </>
  );
}
