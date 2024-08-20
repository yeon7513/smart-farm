import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../../../api/firebase';
import { paths } from '../../../../lib/menu';
import { removeUser } from '../../../../store/user/UserSlice';
import styles from './Nav.module.scss';

function NavLink({ className, path, depth, children }) {
  return (
    <li className={className}>
      {depth ? (
        <>
          <Link to={path}>{children}</Link>

          <ul className={styles.depth}>
            {depth.map((menu, idx) => (
              <li key={idx}>
                <Link to={menu.path}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link to={path}>{children}</Link>
      )}
    </li>
  );
}

function Nav() {
  const auth = getUserAuth();
  const { isAuthenticated } = useSelector((state) => state.UserSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    dispatch(removeUser());
    navigate('/', { replace: true });
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.spot}>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <Link onClick={handleLogout}>로그아웃</Link>
                </li>
                <NavLink path={'/mypage'}>마이페이지</NavLink>
              </>
            ) : (
              paths.spot.map((menu, idx) => (
                <NavLink key={idx} path={menu.path}>
                  {menu.name}
                </NavLink>
              ))
            )}
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
