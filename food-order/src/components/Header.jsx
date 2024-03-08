import { useContext } from 'react';

import CartContext from '../store/CartContext';
import { UserProgressContext } from '../store/UserProgressContext';
import { Button } from '../ui/Button';
import logoImg from '../assets/logo.jpg';

export const Header = () => {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const totalCartItems = cartContext.items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
    0
  );

  const handleShowCart = () => userProgressContext.showCart();

  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart}>Cart ({totalCartItems})</Button>
        {/* 271-3. textOnly Props automatic setting true. */}
      </nav>
    </header>
  );
};
