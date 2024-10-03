import React, { useEffect, useRef, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { chartTypes } from '../../../components/chart/Charts';
import RenderingChart from '../../../components/chart/RenderingChart';
import Maps from '../../../components/map/Maps';
import {
  fetchEntireRegion,
  fetchLocalRegion,
} from '../../../store/usage-status/usageStatusSlice';
import SelectChartType from './select-chart-type/SelectChartType';
import styles from './UsageStatus.module.scss';

function UsageStatus() {
  const { entireRegion, localRegion, isLoading } = useSelector(
    (state) => state.usageStatusSlice
  );
  const dispatch = useDispatch();

  const [chartType, setChartType] = useState('donut');
  const [sort, setSort] = useState('local');
  const [localName, setLocalName] = useState('');
  const [localFarm, setLocalFarm] = useState(null);

  const mapRef = useRef(null);

  // 차트 타입 변경
  const handleChangeChartType = (type) => {
    setChartType(type);
  };

  // 지도 클릭 시 해당 지역 이름 저장
  const handleLocalClick = (name) => {
    setLocalName(name);
  };

  // 지역 초기화 (전체 이용 현황 렌더링)
  const handleResetClick = () => {
    setLocalFarm(null);
    setLocalName('');
    setChartType('donut');
    if (mapRef.current && mapRef.current.resetMap) {
      mapRef.current.resetMap();
    }
  };

  // 조회별 렌더링
  const handleSortClick = (sort) => {
    setSort(sort);
    setLocalFarm(null);
  };

  // 데이터 불러오기
  useEffect(() => {
    dispatch(fetchEntireRegion(sort));
  }, [dispatch, sort]);

  useEffect(() => {
    dispatch(fetchLocalRegion(sort));
  }, [dispatch, sort]);

  // 상세 지역 필터링 후 저장
  useEffect(() => {
    const filteredData = localRegion.find((local) => local.local === localName);

    if (!filteredData) {
      return;
    } else {
      setLocalFarm(filteredData.data);
    }
  }, [localRegion, localName]);

  useEffect(() => {
    if (localFarm) {
      setChartType('bar');
    }
  }, [localFarm]);

  return (
    <div className={styles.usageStatus}>
      <div className={styles.sort}>
        <div className={styles.sortBtns}>
          <button onClick={handleResetClick}>
            <GrPowerReset />
          </button>
          <button
            className={sort === 'local' ? styles.active : ''}
            onClick={() => handleSortClick('local')}
          >
            지역별
          </button>
          <button
            className={sort === 'crop' ? styles.active : ''}
            onClick={() => handleSortClick('crop')}
          >
            작물별
          </button>
        </div>
        <Maps
          className={styles.map}
          onRegionClick={handleLocalClick}
          ref={mapRef}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          {!localFarm ? (
            <div className={styles.entrie}>
              {isLoading ? (
                <BeatLoader color="#8adab2" size={20} />
              ) : (
                <>
                  <h2>
                    {sort === 'local' ? '스마트팜' : '작물별'} 전체 이용 현황
                  </h2>
                  <div className={styles.select}>
                    {chartTypes.map((type, idx) => (
                      <SelectChartType
                        key={idx}
                        {...type}
                        type={chartType}
                        handleChange={handleChangeChartType}
                      />
                    ))}
                  </div>
                  <div className={styles.chart}>
                    <RenderingChart chartType={chartType} data={entireRegion} />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.local}>
              {isLoading ? (
                <BeatLoader color="#8adab2" size={20} />
              ) : (
                <>
                  <h2>
                    {sort === 'local' ? '스마트팜' : '작물별'} 상세 이용 현황
                  </h2>
                  <div className={styles.select}>
                    {chartTypes.map((type, idx) => (
                      <SelectChartType
                        key={idx}
                        {...type}
                        type={chartType}
                        handleChange={handleChangeChartType}
                      />
                    ))}
                  </div>
                  <div className={styles.chart}>
                    <RenderingChart chartType={chartType} data={localFarm} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UsageStatus;
