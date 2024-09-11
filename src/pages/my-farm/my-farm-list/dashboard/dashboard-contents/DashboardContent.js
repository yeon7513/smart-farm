import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import DashboardSector from '../dashboard-sector/DashboardSector';
import { fetchSectorInfo } from './../../../../../store/dashboard/dashboardSlice';

function DashboardContent({ docId }) {
  const { sectorInfo } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSectorInfo(docId));
  }, [dispatch, docId]);

  return (
    <div>
      {[...sectorInfo]
        .sort((a, b) => a.id - b.id)
        .map((sector) => (
          <DashboardSector key={sector.id} id={sector.id} data={sector} />
        ))}
      <Outlet />
    </div>
  );
}

export default DashboardContent;
