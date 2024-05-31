import className from 'classnames';

import classes from './css/HowToApplyStylesInReact.css';

const HowToApplyStylesInReact = () => {
  const inlineStyles = {
    backgroundColor: 'rebeccapurple',
    width: '100vw',
    height: '50px',
  };

  const isActive = true;
  const barClass = isActive ? 'bar' : '';
  const appClasses = className({
    foo: true,
    baz: true,
    bar: isActive,
  });

  return (
    <>
      <div className="style" />
      <hr />
      <div style={inlineStyles} />
      <hr />
      <div className={`foo ${isActive ? 'bar' : ''} baz`} />
      <hr />
      <div className={barClass} />
      <hr />
      <div className={appClasses} />
      <hr />
    </>
  );
};

export default HowToApplyStylesInReact;
