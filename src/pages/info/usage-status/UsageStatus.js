import React, { useState } from 'react';
import Maps from '../../../components/map/Maps';
import UsageStatusChart from './Chart/UsageStatusChart';
import styles from './UsageStatus.module.scss';

function UsageStatus() {
  const [selectedChartType, setSelectedChartType] = useState('bar');

  const handleChangeChartType = (e) => {
    setSelectedChartType(e.target.value);
  };

  // 차트 데이터
  const data = [44, 55, 13, 43, 22];
  // 차트 레벨
  const labels = ['a', 'b', 'c', 'd', 'e'];

  return (
    <div className={styles.usageStatus}>
      <Maps onRegionClick={() => {}} />
      <div className={styles.chartWrapper}>
        <div className={styles.all}>
          <h2>전체 이용 현황</h2>
          <UsageStatusChart data={data} chartType="donut" labels={labels} />
        </div>
        <div className={styles.detail}>
          <h2>상세 이용 현황</h2>
          <div className={styles.selectWrap} onChange={handleChangeChartType}>
            <label htmlFor="bar">
              <input type="radio" name="chartType" value="bar" defaultChecked />
              <span>막대 그래프</span>
            </label>
            <label htmlFor="pie">
              <input type="radio" name="chartType" value="pie" />
              <span>파이 그래프</span>
            </label>
            <label htmlFor="line">
              <input type="radio" name="chartType" value="line" />
              <span>라인 그래프</span>
            </label>
          </div>
          <UsageStatusChart data={data} chartType={'bar'} labels={labels} />
        </div>
      </div>
    </div>
  );
}

export default UsageStatus;
