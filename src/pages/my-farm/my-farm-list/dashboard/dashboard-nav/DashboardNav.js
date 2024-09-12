import React from 'react';
import { useComponentContext } from '../../../../../context/ComponentContext';
import styles from './DashboardNav.module.scss';

function DashboardNav() {
  const { currComp, setCurrComp } = useComponentContext();

  return (
    <ul className={styles.nav}>
      <li>
        <button
          className={currComp === 'Briefing' ? styles.active : ''}
          onClick={() => setCurrComp('Briefing')}
        >
          메인
        </button>
      </li>
      <li>
        <button
          className={currComp === 'Monitoring' ? styles.active : ''}
          onClick={() => setCurrComp('Monitoring')}
        >
          모니터링
        </button>
      </li>
      <li>
        <button
          className={currComp === 'ControlBox' ? styles.active : ''}
          onClick={() => setCurrComp('ControlBox')}
        >
          컨트롤
        </button>
      </li>
      <li>
        <button
          className={currComp === 'Sensor' ? styles.active : ''}
          onClick={() => setCurrComp('Sensor')}
        >
          센서
        </button>
      </li>
      <li>
        <button
          className={currComp === 'Alert' ? styles.active : ''}
          onClick={() => setCurrComp('Alert')}
        >
          알림 내역
        </button>
      </li>
      <li>
        <button
          className={currComp === 'Report' ? styles.active : ''}
          onClick={() => setCurrComp('Report')}
        >
          보고서
        </button>
      </li>
    </ul>
  );
}

export default DashboardNav;
