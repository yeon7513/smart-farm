import React from 'react';
import { IoLeaf, IoWarning } from 'react-icons/io5';
import styles from './Alert.module.scss';

function Alert() {
  return (
    <div className={styles.alert}>
      <div className={styles.content}>
        <h2>2024.00.00</h2>
        <div className={styles.harvest}>
          <span>
            <IoLeaf />
          </span>
          현재 수확이 가능합니다!
        </div>
      </div>
      <div className={styles.content}>
        <h2>2024.00.00</h2>
        <div className={styles.warning}>
          <span>
            <IoWarning />
          </span>
          해당 지역에 병해충이 유행 중입니다!!
        </div>
        <div className={styles.harvest}>
          <span>
            <IoLeaf />
          </span>
          예상 수확 시기가 다가오고 있습니다. 예상 수확량은 00kg입니다.
        </div>
      </div>
      <div className={styles.content}>
        <h2>2024.00.00</h2>
        <div className={styles.warning}>
          <span>
            <IoWarning />
          </span>
          해당 지역에 자연재해가 발생했습니다!!
        </div>
      </div>
      <div className={styles.content}>
        <h2>2024.00.00</h2>
        <div className={styles.warning}>
          <span>
            <IoWarning />
          </span>
          시스템이 오작동 중입니다!!
        </div>
      </div>
      <div className={styles.content}>
        <h2>2024.00.00</h2>
        <div className={styles.harvest}>
          <span>
            <IoLeaf />
          </span>
          예상 수확 시기는 00월 00일 입니다. 예상 수확량은 00kg 입니다.
        </div>
      </div>
    </div>
  );
}

export default Alert;
