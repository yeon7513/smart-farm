import React from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Container from '../../../../components/layout/container/Container';
import { useComponentContext } from '../../../../context/ComponentContext';
import styles from './DashBoard.module.scss';
import Weather from './weather/Weather';

function DashBoard() {
  const navigate = useNavigate();
  const { currComp, setCurrComp } = useComponentContext();
  const { state } = useLocation();

  return (
    <Container className={styles.wrapper}>
      <div className={styles.dashBoard}>
        <div className={styles.header}>
          <button onClick={() => navigate(-1)}>
            <IoArrowBackCircle />
          </button>
          <h1>{state}</h1>
        </div>
        {/* <div className={styles.alert}>
          <div>
            <span>
              <IoWarning />
            </span>
            해당 지역에 병해충이 유행 중입니다!!
          </div>
          <div>
            <span>
              <IoWarning />
            </span>
            해당 지역에 자연재해가 발생했습니다!!
          </div>
          <div>
            <span>
              <IoWarning />
            </span>
            시스템이 오작동 중입니다!!
          </div>
        </div>
        <div className={styles.harvest}>
          <div>
            <span>
              <IoLeaf />
            </span>
            예상 수확 시기가 다가오고 있습니다. 예상 수확량은 00kg입니다.
          </div>
          <div>
            <span>
              <IoLeaf />
            </span>
            현재 수확이 가능합니다!
          </div>
        </div> */}
        <Weather />
        <div className={styles.nav}>
          <ul>
            <li className={currComp === 'Monitoring' ? styles.active : ''}>
              <button onClick={() => setCurrComp('Monitoring')}>
                모니터링
              </button>
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
        <Outlet />
      </div>
    </Container>
  );
}

export default DashBoard;
