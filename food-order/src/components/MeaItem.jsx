import { currencyFormatter } from '../util/formatting';
import { Button } from '../ui/Button';

export const MeaItem = ({ mealsList }) => {
  const elementMealItem = mealsList.map(meal => {
    const { id, name, price, description, image } = meal;
    console.log(`http://localhost:3000${image}`);

    return (
      <li className='meal-item' key={id}>
        <article>
          <img src={`http://localhost:3000/${image}`} alt={name} />
          <div>
            <h3>{name}</h3>
            <p className='meal-item-price'>{currencyFormatter.format(price)}</p>
            <p className='meal-item-description'>{description}</p>
          </div>
          <p className='meal-item-actions'>
            <Button>Add to Cart</Button>
          </p>
        </article>
      </li>
    );
  });

  return <>{elementMealItem}</>;
};
