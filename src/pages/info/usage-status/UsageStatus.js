import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RenderingChart from '../../../components/chart/RenderingChart';
import Maps from '../../../components/map/Maps';
import {
  fetchEntireRegionCrop,
  fetchEntireRegionFarm,
  fetchLocalRegionFarm,
} from '../../../store/usage-status/usageStatusSlice';
import styles from './UsageStatus.module.scss';

function UsageStatus() {
  const [selectedChartType, setSelectedChartType] = useState('bar');

  const {
    entireRegionFarm,
    entireRegionCrop,
    localRegionFarm,
    isLoading,
    error,
  } = useSelector((state) => state.usageStatusSlice);

  const [localName, setLocalName] = useState('');
  const [localFarm, setLocalFarm] = useState(null);

  const dispatch = useDispatch();

  const handleChangeChartType = (e) => {
    setSelectedChartType(e.target.value);
  };

  const handleLocalClick = (name) => {
    setLocalName(name);
  };

  const handleResetClick = () => {
    setLocalFarm(null);
  };

  useEffect(() => {
    dispatch(fetchEntireRegionFarm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchLocalRegionFarm());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchEntireRegionCrop());
  }, [dispatch]);

  useEffect(() => {
    const filteredData = localRegionFarm.find((local) => local[localName]);
    if (!filteredData) {
      return;
    } else {
      setLocalFarm(filteredData[localName]);
    }
  }, [localRegionFarm, localName]);

  return (
    <div className={styles.usageStatus}>
      <Maps className={styles.map} onRegionClick={handleLocalClick} />
      <div className={styles.chartWrapper}>
        <div>
          <button onClick={handleResetClick}>새로고침</button>
          <button>지역별</button>
          <button>작물별</button>
        </div>
        {!localFarm ? (
          <div className={styles.all}>
            <h2>전체 이용 현황</h2>
            <RenderingChart chartType={'donut'} data={entireRegionFarm} />
          </div>
        ) : (
          <div className={styles.detail}>
            <h2>상세 이용 현황</h2>
            <div className={styles.selectWrap} onChange={handleChangeChartType}>
              <label htmlFor="bar">
                <input
                  type="radio"
                  name="chartType"
                  value="bar"
                  defaultChecked
                />
                <span>막대 그래프</span>
              </label>
              <label htmlFor="area">
                <input type="radio" name="chartType" value="area" />
                <span>영역 그래프</span>
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
            <div className={styles.chart}>
              <RenderingChart chartType={selectedChartType} data={localFarm} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UsageStatus;
