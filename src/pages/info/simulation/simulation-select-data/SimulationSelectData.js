import React from 'react';
import SimulationBtn from './simulation-btns/SimulationBtn';

function SimulationSelectData({ name, selectDatas }) {
  return (
    <li>
      <h4>{name}</h4>
      <div>
        {selectDatas.map((data, idx) => (
          <SimulationBtn key={idx}>{data}</SimulationBtn>
        ))}
      </div>
    </li>
  );
}

export default SimulationSelectData;
