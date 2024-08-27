import React from 'react';
import styles from './FarmList.module.scss';
import FarmListItem from './my-farm-list-item/FarmListItem';

const testFarmList = [
  { farmId: 1, name: '농장1' },
  { farmId: 2, name: '농장2' },
  { farmId: 3, name: '농장3' },
  { farmId: 4, name: '농장4' },
  { farmId: 5, name: '농장5' },
];

function FarmList() {
  return (
    <>
      <h2 className={styles.title}>내 농장 리스트</h2>
      <ul className={styles.list}>
        {testFarmList.map((item) => (
          <FarmListItem key={item.farmId} {...item} />
        ))}
      </ul>
    </>
  );
}

export default FarmList;
