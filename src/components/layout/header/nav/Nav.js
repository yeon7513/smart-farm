import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { paths } from '../../../../lib/menu';
import styles from './Nav.module.scss';

function NavLink({ className, path, depth, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {depth ? (
        <>
          <Link to={path}>{children}</Link>
          {isHovered && (
            <ul className={styles.depth}>
              {depth.map((menu, idx) => (
                <li key={idx}>
                  <Link to={menu.path}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <Link to={path}>{children}</Link>
      )}
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
            <NavLink
              key={idx}
              path={menu.path}
              depth={menu.depth}
              className={styles.mainMenu}
            >
              {menu.name}
            </NavLink>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Nav;
