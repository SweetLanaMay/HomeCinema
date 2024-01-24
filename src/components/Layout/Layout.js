import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import styled from 'styled-components';
import logoImg from '../../images/logo.png';

const StyledLink = styled(NavLink)`
  color: black;
  display: inline-block;
  margin-right: 20px;
  text-decoration: none;
  color: white;
  font-size: 24px;
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
      <a href="/HomeCinema" className={css.logoContainer}>
        <img src={logoImg} alt="HomeCinema Logo" className={css.logo} />
        <h1 className={css.title}>HomeCinema</h1>
      </a>

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
