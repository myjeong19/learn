import { Link } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
// * NavLink는 Link의 대안이다.

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? classes.active : null)}
              //   * NavLink의 className은 isActive를 인자로 받는다.
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/products'
              className={({ isActive }) => (isActive ? classes.active : null)}
            >
              Product
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
