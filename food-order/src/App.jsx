import { Header } from './components/Header';
import { Meals } from './components/Meals';
import { UserProgressContextProvider } from './store/UserProgressContext';
import { CartContextProvider } from './store/CartContext';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';

export const App = () => {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
};
