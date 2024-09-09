import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GridLoader } from 'react-spinners';
import RenderingChart from '../../../components/chart/RenderingChart';
import Maps from '../../../components/map/Maps';
import {
  fetchEntireRegion,
  fetchLocalRegion,
} from '../../../store/usage-status/usageStatusSlice';
import styles from './UsageStatus.module.scss';

const chartTypes = [
  { value: 'bar', label: '막대 그래프' },
  { value: 'area', label: '영역 그래프' },
  { value: 'pie', label: '파이 그래프' },
  { value: 'line', label: '라인 그래프' },
];

function UsageStatus() {
  const { entireRegion, localRegion, isLoading } = useSelector(
    (state) => state.usageStatusSlice
  );

  const [chartType, setChartType] = useState('bar');
  const [sort, setSort] = useState('local');
  const [localName, setLocalName] = useState('');
  const [localFarm, setLocalFarm] = useState(null);

  const dispatch = useDispatch();

  // 차트 타입 변경
  const handleChangeChartType = (e) => {
    setChartType(e.target.value);
  };

  // 지도 클릭 시 해당 지역 이름 저장
  const handleLocalClick = (name) => {
    setLocalName(name);
  };

  // 지역 초기화 (전체 이용 현황 렌더링)
  const handleResetClick = () => {
    setLocalFarm(null);
    setLocalName('');
  };

  // 조회별 렌더링
  const handleSortClick = (sort) => {
    setSort(sort);
    setLocalFarm(null);
    console.log(chartType);
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

  return (
    <div className={styles.usageStatus}>
      <Maps className={styles.map} onRegionClick={handleLocalClick} />
      <div className={styles.chartWrapper}>
        <div>
          <button onClick={handleResetClick}>새로고침</button>
          <button onClick={() => handleSortClick('local')}>지역별</button>
          <button onClick={() => handleSortClick('crop')}>작물별</button>
        </div>
        {!localFarm ? (
          <div className={styles.all}>
            {isLoading ? (
              <GridLoader color="#a2ca71" margin={5} size={20} />
            ) : (
              <>
                <h2>전체 이용 현황</h2>
                <RenderingChart chartType={'donut'} data={entireRegion} />
              </>
            )}
          </div>
        ) : (
          <div className={styles.detail}>
            {isLoading ? (
              <GridLoader color="#a2ca71" margin={5} size={20} />
            ) : (
              <>
                <h2>상세 이용 현황</h2>
                <div className={styles.selectWrap}>
                  {chartTypes.map((type) => (
                    <label key={type.value} htmlFor="bar">
                      <input
                        type="radio"
                        name="chartType"
                        value="bar"
                        defaultChecked
                      />
                      <span>막대 그래프</span>
                    </label>
                  ))}
                  {/* <label htmlFor="area">
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
                  </label> */}
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
  );
}

export default UsageStatus;
