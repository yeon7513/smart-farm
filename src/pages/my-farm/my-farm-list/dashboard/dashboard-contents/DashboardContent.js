import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { useComponentContext } from '../../../../../context/ComponentContext';
import { useSectorContext } from '../../../../../context/SectorContext';
import DashboardSector from '../dashboard-nav/dashboard-sector/DashboardSector';
import { fetchSectorInfo } from './../../../../../store/dashboard/dashboardSlice';
import styles from './DashboardContent.module.scss';
import Weather from './weather/Weather';

function DashboardContent({ docId }) {
  const { sectorInfo } = useSelector((state) => state.dashboardSlice);
  const { currComp } = useComponentContext();
  const { selectedSector } = useSectorContext();
  const [count, setCount] = useState(1);
  const [randomCount, setRandomCount] = useState(1);
  const dispatch = useDispatch();
  const { state } = useLocation();
  useEffect(() => {
    const collectionName = `dashboard/${docId}/sector`;
    dispatch(fetchSectorInfo(collectionName));
  }, [dispatch, docId]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCount((prevCount) => {
  //       if (prevCount >= 5000) {
  //         return 0;
  //       }
  //       return prevCount + 1;
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setRandomCount((prevCount) => {
  //       // 1시간 마다 1000으로 설정
  //       const currentTime = new Date().getMinutes(); // 현재 시간을 분 단위로 체크
  //       if (currentTime === 0) {
  //         // 매시간 정각에 1000 설정
  //         return 1000;
  //       }

  //       // 1000 미만일 때는 랜덤 증가
  //       if (prevCount >= 1000) {
  //         return 0;
  //       }

  //       const randomIncrease = Math.random() * 1000;
  //       return randomIncrease;
  //     });
  //   }, 10000); // 10초마다 실행

  //   return () => clearInterval(interval);
  // }, []);

  // useEffect(() => {
  //   dispatch(countData(count));
  // }, [count, dispatch]);

  // useEffect(() => {
  //   dispatch(randomCountData(randomCount));
  // }, [randomCount, dispatch]);

  // console.log(count);
  // console.log(randomCount);
  return (
    <div className={styles.content}>
      {currComp === 'Briefing' && (
        <Weather latitude={state.lat} longitude={state.lng} />
      )}
      <ul className={styles.sectorMenu}>
        {currComp !== 'Alert' &&
          [...sectorInfo]
            .sort((a, b) => a.id - b.id)
            .map((sector) => (
              <DashboardSector
                key={sector.id}
                id={sector.id}
                data={sector}
                className={styles.active}
              />
            ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default DashboardContent;
