import React from 'react';
import { Outlet } from 'react-router-dom';

function Monitoring() {
  return (
    <div>
      <span>Monitoring</span>
      <Outlet />
    </div>
  );
}

export default Monitoring;
