import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MyFarm.module.scss';

function MyFarm() {
  return (
    <div className={styles.myFarm}>
      MyFarm
      <Outlet />
    </div>
  );
}

export default MyFarm;
