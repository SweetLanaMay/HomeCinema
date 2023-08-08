import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import styled from 'styled-components';

const StyledLink = styled(NavLink)`
  color: black;
  display: inline-block;
  margin-right: 20px;
  text-decoration: none;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;

  &.active {
    color: #ff4500;
    text-decoration: underline;
  }
`;

const Layout = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <ul className={css.linkList}>
          <li className={css.linkItem}>
            <StyledLink to="/">Home</StyledLink>
          </li>
          <li className={css.linkItem}>
            <StyledLink to="/movies">Movies</StyledLink>
          </li>
        </ul>
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
export default Layout;
