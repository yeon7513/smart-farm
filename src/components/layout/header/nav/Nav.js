import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { IoMdLogOut } from 'react-icons/io';
import { LiaUserCogSolid } from 'react-icons/lia';
import { PiFarmBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserAuth } from '../../../../api/firebase';
import { useComponentContext } from '../../../../context/ComponentContext';
import { paths } from '../../../../lib/menu';
import { removeUser } from '../../../../store/user/UserSlice';
import Contact from './../../../contact/Contact';
import styles from './Nav.module.scss';

function NavLink({ className, path, depth, children, setMenuOpen }) {
  const { setCurrComp } = useComponentContext();

  const handleToMove = (comp) => {
    setCurrComp(comp);
    setMenuOpen(false);
  };

  return (
    <li className={className}>
      {depth ? (
        <>
          <Link to={path} onClick={() => setMenuOpen(false)}>
            {children}
          </Link>
          <div className={styles.depthWrapper}>
            <ul className={styles.depth}>
              {depth.map((menu, idx) => (
                <li key={idx}>
                  <Link to={menu.path} onClick={() => handleToMove(menu.comp)}>
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Link to={path} onClick={() => setMenuOpen(false)}>
          {children}
        </Link>
      )}
    </li>
  );
}

function Nav({ menuOpen, setMenuOpen }) {
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const auth = getUserAuth();
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(removeUser());
      if (window.Kakao.Auth.getAccessToken()) {
        console.log('로그아웃 중입니다.');
        await new Promise((resolve) => {
          window.Kakao.Auth.logout(function () {
            console.log('로그아웃 성공');
            resolve();
          });
        });
      } else {
        console.log('로그인 상태가 아닙니다.');
      }
      navigate('/');
    } catch (error) {
      console.error(error);
    }
    setMenuOpen(false);
  };

  useEffect(() => {
    // 위치 정보를 가져옵니다.
    const fetchLocation = () => {
      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            setPosition({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError('사용자가 위치 권한을 거부했습니다.');
                break;
              case error.POSITION_UNAVAILABLE:
                setError('위치 정보를 사용할 수 없습니다.');
                break;
              case error.TIMEOUT:
                setError('위치 정보 요청 시간이 초과되었습니다.');
                break;
              case error.UNKNOWN_ERROR:
                setError('알 수 없는 오류가 발생했습니다.');
                break;
              default:
                setError('알 수 없는 오류가 발생했습니다.');
                break;
            }
          }
        );

        return () => {
          navigator.geolocation.clearWatch(watchId);
        };
      } else {
        setError('Geolocation API를 지원하지 않는 브라우저입니다.');
      }
    };

    fetchLocation();
  }, []);

  const loginUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <nav className={menuOpen ? cn(styles.nav, styles.show) : styles.nav}>
        <div
          className={menuOpen ? cn(styles.spot, styles.showMenu) : styles.spot}
        >
          <ul>
            {isAuthenticated ? (
              <>
                {/* 현재 위치 정보는 현재 시점에서 불필요하다고 생각이 되어
              주석 처리 하였습니다. 필요하실 때 쓰시면 됩니다. */}
                {/* <li>
                  현재 위치 정보: {position.lat.toFixed(0)}.
                  {position.lon.toFixed(0)}
                </li>
                {error && <p style={{ color: "red" }}>{error}</p>} */}
                {loginUser.email.includes('admin') ? (
                  <NavLink path={'/manager'} setMenuOpen={setMenuOpen}>
                    관리자
                  </NavLink>
                ) : (
                  <>
                    <li className={styles.welcome}>
                      {loginUser.nickname}님, 환영합니다.
                    </li>
                    <NavLink
                      path={'/my-farm'}
                      className={cn(styles.gotoMyfarm, styles.loggingIn)}
                      setMenuOpen={setMenuOpen}
                    >
                      {menuOpen ? <PiFarmBold /> : '내 농장'}
                    </NavLink>
                    <NavLink
                      path={'/mypage'}
                      className={cn(styles.gotoMypage, styles.loggingIn)}
                      setMenuOpen={setMenuOpen}
                    >
                      {menuOpen ? <LiaUserCogSolid /> : '마이페이지'}
                    </NavLink>
                  </>
                )}
                <li className={cn(styles.logout, styles.loggingIn)}>
                  <Link onClick={handleLogout}>
                    {menuOpen ? <IoMdLogOut /> : '로그아웃'}
                  </Link>
                </li>
              </>
            ) : (
              paths.spot.map((menu, idx) => (
                <NavLink key={idx} path={menu.path} setMenuOpen={setMenuOpen}>
                  {menu.name}
                </NavLink>
              ))
            )}
          </ul>
        </div>
        <ul
          className={menuOpen ? cn(styles.main, styles.showMenu) : styles.main}
        >
          {paths.gnb.map((menu, idx) => (
            <NavLink
              key={idx}
              path={menu.path}
              depth={menu.depth}
              className={styles.mainMenu}
              setMenuOpen={setMenuOpen}
            >
              {menu.name}
            </NavLink>
          ))}
        </ul>
        {menuOpen && (
          <Contact className={styles.navContact} isResponsive={menuOpen} />
        )}
      </nav>
    </>
  );
}

export default Nav;
