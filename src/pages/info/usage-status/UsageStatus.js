import React, { useEffect, useState } from 'react';
import { usageStatusData } from '../../../api/usageStatusData';
import RenderingChart from '../../../components/chart/RenderingChart';
import Maps from '../../../components/map/Maps';
import styles from './UsageStatus.module.scss';

function UsageStatus() {
  const [selectedChartType, setSelectedChartType] = useState('bar');

  const handleChangeChartType = (e) => {
    setSelectedChartType(e.target.value);
  };

  useEffect(() => {
    usageStatusData();
  }, []);

  return (
    <div className={styles.usageStatus}>
      <Maps className={styles.map} onRegionClick={() => {}} />
      <div className={styles.chartWrapper}>
        <div className={styles.all}>
          <h2>전체 이용 현황</h2>
          <RenderingChart chartType={'donut'} />
        </div>
        <div className={styles.detail}>
          <h2>상세 이용 현황</h2>
          <div className={styles.selectWrap} onChange={handleChangeChartType}>
            <input type="radio" name="chartType" value="bar" defaultChecked />
            <label htmlFor="bar">
              <span>막대 그래프</span>
            </label>
            <input type="radio" name="chartType" value="pie" />
            <label htmlFor="pie">
              <span>파이 그래프</span>
            </label>
            <label htmlFor="line">
              <input type="radio" name="chartType" value="line" />
              <span>라인 그래프</span>
            </label>
          </div>
          <div className={styles.chart}>
            <RenderingChart chartType={selectedChartType} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsageStatus;
