import React from 'react';
import { Outlet } from 'react-router-dom';
import SelectBox from './select-box/SelectBox';

const items = ['토마토', '딸기', '파프리카'];

function Simulation() {
  return (
    <div>
      <h2>서비스 체험</h2>
      {items.map((item, idx) => (
        <SelectBox key={idx} item={item} id={idx} />
      ))}
      <Outlet />
    </div>
  );
}

export default Simulation;
