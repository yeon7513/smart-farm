import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import styles from './MyFarm.module.scss';

function MyFarm() {
  return (
    <Container className={styles.myFarm}>
      <div className={styles.map}>지도가 들어갈 예정입니다.</div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </Container>
  );
}

export default MyFarm;
