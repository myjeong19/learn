import logoImg from '../assets/logo.jpg';

export const Header = () => {
  return (
    <header id='main-header'>
      <div id='title'>
        <img src={logoImg} alt='' />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
};
