import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderingChart from '../../../components/chart/RenderingChart';
import Maps from '../../../components/map/Maps';
import {
  fetchEntireRegionFarm,
  fetchLocalRegionFarm,
} from '../../../store/usage-status/usageStatusSlice';
import styles from './UsageStatus.module.scss';

function UsageStatus() {
  const [selectedChartType, setSelectedChartType] = useState('bar');
  const {
    entireRegionFarm,
    localRegionFarm,
    entireRegionCrop,
    localRegionCrop,
    isLoading,
    error,
  } = useSelector((state) => state.usageStatusSlice);

  const dispatch = useDispatch();

  const handleChangeChartType = (e) => {
    setSelectedChartType(e.target.value);
  };

  const handleLocalClick = (name) => {
    console.log(name);
    console.log(localRegionFarm[name]);
    console.log(localRegionFarm['전라남도']);
  };

  console.log(localRegionFarm['전라남도']);

  useEffect(() => {
    dispatch(fetchEntireRegionFarm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLocalRegionFarm());
  }, [dispatch]);

  useEffect(() => {
    console.log(localRegionFarm);
  }, [localRegionFarm]);

  return (
    <div className={styles.usageStatus}>
      <Maps className={styles.map} onRegionClick={handleLocalClick} />
      <div className={styles.chartWrapper}>
        <div className={styles.all}>
          <h2>전체 이용 현황</h2>
          <RenderingChart chartType={'donut'} data={entireRegionFarm} />
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
