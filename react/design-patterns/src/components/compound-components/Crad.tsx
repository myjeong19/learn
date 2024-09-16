import { createContext, useContext } from 'react';

const Context = createContext({
  test: '',
});

type CardChildren = {
  children: React.ReactNode;
};

const Body = (props: CardChildren) => {
  const { children } = props;

  return <div style={{ padding: '.5rem' }}>{children}</div>;
};

const Header = (props: CardChildren) => {
  const { children } = props;

  const { test } = useContext(Context);
  return (
    <div
      style={{
        borderBottom: '1px solid black',
        padding: '.5rem',
        marginBottom: '.5rem',
      }}
    >
      {children}
      {test}
    </div>
  );
};
const Footer = (props: CardChildren) => {
  const { children } = props;
  return (
    <div
      style={{
        borderTop: '1px solid black',
        padding: '.5rem',
        marginTop: '.5rem',
      }}
    >
      {children}
    </div>
  );
};

type Card = {
  test: string;
  children: React.ReactNode;
};

const Card = (props: Card) => {
  const { test, children } = props;

  return (
    <Context.Provider value={{ test }}>
      <div style={{ border: '1px solid black' }}>{children}</div>
    </Context.Provider>
  );
};

export default Card;

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;
