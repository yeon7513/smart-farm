import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FarmListItem.module.scss';

function FarmListItem({ farmId, name, crop }) {
  const navigate = useNavigate();

  return (
    <li className={styles.item}>
      <div className={styles.name}>
        {name} / {crop}
      </div>
      <div className={styles.btns}>
        <button
          onClick={() =>
            navigate(`/my-farm/${farmId}`, { state: { name, crop } })
          }
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
