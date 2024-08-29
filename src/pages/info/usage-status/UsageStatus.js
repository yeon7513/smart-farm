import React from 'react';
import Maps from '../../../components/map/Maps';
import UsageStatusChart from './Chart/UsageStatusChart';
import styles from './UsageStatus.module.scss';

function UsageStatus() {
  return (
    <div className={styles.usageStatus}>
      <Maps onRegionClick={() => {}} />
      <UsageStatusChart />
    </div>
  );
}

export default UsageStatus;
