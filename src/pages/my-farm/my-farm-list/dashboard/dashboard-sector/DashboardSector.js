import React, { useEffect } from 'react';
import { useSectorContext } from '../../../../../context/SectorContext';

function DashboardSector({ id, data }) {
  const { sector, setSector } = useSectorContext();

  console.log(sector);

  const handleClickSaveData = () => {
    setSector(data);
  };

  useEffect(() => {}, []);

  return <button onClick={handleClickSaveData}>sector {id}</button>;
}

export default DashboardSector;
