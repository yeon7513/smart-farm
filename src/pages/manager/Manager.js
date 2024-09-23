import React, { useEffect } from 'react';
import Container from '../../components/layout/container/Container';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import { useComponentContext } from '../../context/ComponentContext';
import ManagerMenu from '../../context/ManagerMenu';
import { managerSideMenu } from '../../lib/menu';
import styles from './Manager.module.scss';

function Manager() {
  const { setCurrComp } = useComponentContext();

  useEffect(() => {
    setCurrComp('OverallStatus');
  }, [setCurrComp]);

  return (
    <Container className={styles.container}>
      <div className={styles.sidebar}>
        <ul className={styles.menu}>
          {managerSideMenu.map((menu) => (
            <Sidebar
              key={menu.comp}
              comp={menu.comp}
              name={menu.name}
              handleClick={setCurrComp}
            />
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <ManagerMenu />
      </div>
    </Container>
  );
}

export default Manager;
