import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FarmListItem.module.scss';

function FarmListItem({ farmData }) {
  const { crop, farmName, docId } = farmData;
  const navigate = useNavigate();

  return (
    <li className={styles.item}>
      <div className={styles.name}>
        {farmName} / {crop}
      </div>
      <div className={styles.btns}>
        <button
          onClick={() => navigate(`/my-farm/${docId}`, { state: farmData })}
        >
          관리
        </button>
        <button>수정</button>
        <button className={styles.deleteBtn}>삭제</button>
      </div>
    </li>
  );
}

export default FarmListItem;
