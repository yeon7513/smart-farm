import React from 'react';
import { useComponentContext } from '../../../../../context/ComponentContext';
import styles from './DashboardNav.module.scss';

function DashboardNav(props) {
  const { currComp, setCurrComp } = useComponentContext();

  return (
    <div className={styles.nav}>
      <ul>
        <li className={currComp === 'Briefing' ? styles.active : ''}>
          <button onClick={() => setCurrComp('Briefing')}>메인</button>
        </li>
        <li className={currComp === 'Monitoring' ? styles.active : ''}>
          <button onClick={() => setCurrComp('Monitoring')}>모니터링</button>
        </li>
        <li className={currComp === 'ControlBox' ? styles.active : ''}>
          <button onClick={() => setCurrComp('ControlBox')}>컨트롤</button>
        </li>
        <li className={currComp === 'Sensor' ? styles.active : ''}>
          <button onClick={() => setCurrComp('Sensor')}>센서</button>
        </li>
        <li className={currComp === 'Alert' ? styles.active : ''}>
          <button onClick={() => setCurrComp('Alert')}>알림 내역</button>
        </li>
        <li className={currComp === 'Report' ? styles.active : ''}>
          <button onClick={() => setCurrComp('Report')}>보고서</button>
        </li>
      </ul>
    </div>
  );
}

export default DashboardNav;
