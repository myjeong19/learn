import { useContext } from 'react';

import { currencyFormatter } from '../util/formatting';
import CartContext from '../store/CartContext';
import { Button } from '../ui/Button';

export const MeaItem = ({ mealsList }) => {
  const cartContext = useContext(CartContext);

  const elementMealItem = mealsList.map(meal => {
    const { id, name, price, description, image } = meal;
    const handleAddMealToCart = () => {
      cartContext.addItem(meal);
    };

    return (
      <li className='meal-item' key={id}>
        <article>
          <img src={`http://localhost:3000/${image}`} alt={name} />
          <div>
            <h3>{name}</h3>
            <p className='meal-item-price'>{currencyFormatter.format()}</p>
            <p className='meal-item-description'>{description}</p>
          </div>
          <p className='meal-item-actions'>
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
          </p>
        </article>
      </li>
    );
  });

  return <>{elementMealItem}</>;
};
