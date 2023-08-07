import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

const Layout = () => {
  return (
    <div className={css.container}>
      <header className={css.header}>
        <ul className={css.linkList}>
          <li className={css.linkItem}>
            <NavLink
              to="/"
              className={css.headerLink}
              activeclassname={css.active}
            >
              Home
            </NavLink>
          </li>
          <li className={css.linkItem}>
            <NavLink
              to="/movies"
              className={css.headerLink}
              activeclassname={css.active}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
