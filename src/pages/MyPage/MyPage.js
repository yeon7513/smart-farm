import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import { useComponentContext } from '../../context/ComponentContext';
import { myPageSideMenu } from '../../lib/menu';
import styles from './MyPage.module.scss';

function MyPage() {
  const { setCurrComp } = useComponentContext();

  return (
    <Container className={styles.container}>
      <ul className={styles.myPageSidebar}>
        {myPageSideMenu.map((list, idx) => (
          <li key={idx}>
            {list.label}
            <ul>
              {list.menu.map((menu) => (
                <Sidebar
                  key={menu.comp}
                  comp={menu.comp}
                  name={menu.name}
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
