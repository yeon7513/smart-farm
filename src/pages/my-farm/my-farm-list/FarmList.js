import React from 'react';
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
      <div>내 농장 리스트</div>
      {testFarmList.map((item) => (
        <FarmListItem key={item.farmId} {...item} />
      ))}
    </>
  );
}

export default FarmList;
