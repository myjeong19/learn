import { useContext } from 'react';

import CartContext from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { CartItem } from './Cartitem';
import { currencyFormatter } from '../util/formatting';

export const Cart = () => {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const handleCloseCart = () => userProgressContext.hideCart();
  const handleGoToCheckout = () => userProgressContext.showCheckout();

  return (
    <Modal
      className='cart'
      open={userProgressContext.progress === 'cart'}
      onClose={handleCloseCart}
    >
      <h2>Your Cart</h2>

      <ul>
        {cartContext.items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => cartContext.addItem(item)}
            onDecrease={() => cartContext.removeItem(item.id)}
          />
        ))}
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
          <Button onClick={handleCloseCart}>Close</Button>
          {cartContext.items.length > 0 && (
            <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
          )}
        </p>
      </ul>
    </Modal>
  );
};
