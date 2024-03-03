import { Button } from '../ui/Button';
import logoImg from '../assets/logo.jpg';

export const Header = () => {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button>Cart (0)</Button>
        // 271-3. textOnly Props automatic setting true.
      </nav>
    </header>
  );
};
