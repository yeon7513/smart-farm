import React, { useEffect, useState } from 'react';
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
  const [position, setPosition] = useState({ lat: null, lon: null });
  const [error, setError] = useState(null);
  const auth = getUserAuth();
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    dispatch(removeUser());
    navigate('/', { replace: true });
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
      <nav className={styles.nav}>
        <div className={styles.spot}>
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
                  <NavLink path={'/manager'}>관리자</NavLink>
                ) : (
                  <>
                    <p>{loginUser.email}님, 환영합니다.</p>
                    <NavLink path={'/my-farm'}>내 농장</NavLink>
                    <NavLink path={'/mypage'}>마이페이지</NavLink>
                  </>
                )}
                <li>
                  <Link onClick={handleLogout}>로그아웃</Link>
                </li>
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
