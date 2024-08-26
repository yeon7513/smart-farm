import React from 'react';
import { Outlet } from 'react-router-dom';

function MyFarm() {
  return (
    <div>
      MyFarm
      <Outlet />
    </div>
  );
}

export default MyFarm;
