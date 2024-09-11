import React from 'react';
import styles from './ControlItem.module.scss';

function ControlItem({ option }) {
  return (
    <div className={styles.control}>
      <div className={styles.name}>{option}</div>
      <div>제어 버튼들....</div>
    </div>
  );
}

export default ControlItem;
