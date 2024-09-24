import React from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';

function DashboardSector({ id, data, className }) {
  const { setSector } = useSectorContext();
  const handleClickSaveData = () => {
    setSector(data);
  };

  console.log(data);

  return (
    <li className={className}>
      <button onClick={handleClickSaveData}>sector {id}</button>
    </li>
  );
}

export default DashboardSector;
