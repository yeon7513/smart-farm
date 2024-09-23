import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import { useComponentContext } from '../../context/ComponentContext';
import { myPageSideMenu } from '../../lib/menu';
import styles from './MyPage.module.scss';

function MyPage() {
  const { setCurrComp } = useComponentContext();

  useEffect(() => {
    return () => {
      setCurrComp('IntroMyPage');
    };
  }, [setCurrComp]);

  return (
    <Container className={styles.container}>
      <ul className={styles.myPageSidebar}>
        {myPageSideMenu.map((list, idx) => (
          <li key={idx}>
            <h2>{list.label}</h2>
            <ul className={styles.depth}>
              {list.menu.map((menu) => (
                <Sidebar
                  key={menu.comp}
                  comp={menu.comp}
                  name={menu.name}
                  className={styles.depthMenu}
                  handleClick={setCurrComp}
                />
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Outlet />
    </Container>
  );
}

export default MyPage;
