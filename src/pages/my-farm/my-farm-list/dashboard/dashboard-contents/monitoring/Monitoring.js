import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSectorContext } from '../../../../../../context/SectorContext';

function Monitoring() {
  const { sector } = useSectorContext();
  console.log(sector.growthInfo);

  return (
    <div>
      <span>Monitoring</span>
      <Outlet />
    </div>
  );
}

export default Monitoring;
