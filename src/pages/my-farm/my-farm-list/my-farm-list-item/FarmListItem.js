import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FarmListItem.module.scss';

function FarmListItem({ farmId, name }) {
  const navigate = useNavigate();

  return (
    <ul className={styles.items}>
      <li>
        <div className={styles.name}>{name}</div>
        <div className={styles.btns}>
          <button onClick={() => navigate(`/my-farm/${farmId}`)}>관리</button>
          <button>수정</button>
          <button className={styles.deleteBtn}>삭제</button>
        </div>
      </li>
    </ul>
  );
}

export default FarmListItem;
