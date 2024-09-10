import React from 'react';
import { IoArrowBackCircle } from 'react-icons/io5';
import { TbBellFilled, TbHomeFilled, TbUserFilled } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardHeader.module.scss';
import Weather from './weather/Weather';

function DashboardHeader({ info }) {
  const { latitude, longitude, crop, farmName } = info;

  const navigate = useNavigate();
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <button onClick={() => navigate(-1)}>
          <IoArrowBackCircle />
        </button>
        <h1>
          {farmName} / {crop}
        </h1>
      </div>
      <div className={styles.time}>{new Date().toLocaleDateString()}</div>
      <div className={styles.icons}>
        <button>
          <TbHomeFilled />
        </button>
        <button>
          <TbBellFilled />
        </button>
        <button>
          <TbUserFilled />
        </button>
      </div>
      <Weather />
    </div>
  );
}

export default DashboardHeader;
