import { currencyFormatter } from '../util/formatting';

export const CartItem = ({ item, onIncrease, onDecrease }) => {
  const { id, name, quantity } = item;

  return (
    <li key={id} className='cart-item'>
      <p>
        {name} - {quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className='cart-item-actions'>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};
