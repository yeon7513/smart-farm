import React from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { TbBellFilled, TbHomeFilled, TbUserFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardHeader.module.scss';
import Weather from './weather/Weather';

function DashboardHeader({ info }) {
  const { latitude, longitude, crop, farmName, type } = info;
  const navigate = useNavigate();

  const typeTranslate = (type) => {
    switch (type) {
      case 'facility':
        return '시설';
      case 'openGround':
        return '노지';

      default:
        return '기타';
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <button onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
        </button>
        <h1>
          {farmName} / {crop} / {typeTranslate(type)}
        </h1>
      </div>
      <div className={styles.time}>{new Date().toLocaleDateString()}</div>
      <div className={styles.icons}>
        <button onClick={() => navigate('/')}>
          <TbHomeFilled />
        </button>
        <button onClick={() => navigate('/')}>
          <TbBellFilled />
        </button>
        <button onClick={() => navigate('/Mypage')}>
          <TbUserFilled />
        </button>
      </div>
      <Weather />
    </div>
  );
}

export default DashboardHeader;
