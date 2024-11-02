import React from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { TbHomeFilled, TbUserFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import Clock from './../../../../../components/clock/Clock';
import styles from './DashboardHeader.module.scss';

function DashboardHeader({ info }) {
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.title}>
          <button className={styles.back} onClick={() => navigate(-1)}>
            <IoArrowBackCircle />
          </button>
          <h1>
            {info?.name} 님의 {info?.farmName} / {info?.type} / {info?.crop}
          </h1>
        </div>
        <Clock />
        <div className={styles.icons}>
          <button className={styles.gotoHome} onClick={() => navigate('/')}>
            <TbHomeFilled />
          </button>
          <button
            className={styles.gotoMypage}
            onClick={() => navigate('/Mypage')}
          >
            <TbUserFilled />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
