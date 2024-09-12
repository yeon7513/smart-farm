import React from 'react';
import Container from '../../components/layout/container/Container';
import ManagerMenu from '../../context/ManagerMenu';
import ManagerSidebar from './manager-sidebar/ManagerSidebar';
import styles from './Manager.module.scss';

function Manager() {
  return (
    <Container className={styles.container}>
      <ManagerSidebar />
      <div className={styles.content}>
        <ManagerMenu />
      </div>
    </Container>
  );
}

export default Manager;
