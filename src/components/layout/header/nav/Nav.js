import React from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../../../../lib/menu';
import styles from './Nav.module.scss';

function NavLink({ className, path, children }) {
  return (
    <li className={className}>
      <Link to={path}>{children}</Link>
    </li>
  );
}

function Nav() {
  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.spot}>
          <ul>
            {paths.spot.map((menu, idx) => (
              <NavLink key={idx} path={menu.path}>
                {menu.name}
              </NavLink>
            ))}
          </ul>
        </div>
        <ul className={styles.main}>
          {paths.gnb.map((menu, idx) => (
            <NavLink key={idx} path={menu.path}>
              {menu.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
