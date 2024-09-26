import React, { useState } from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';

function DashboardSector({ id, data, className }) {
  const [isClicked, setIsClicked] = useState(false);
  const { setSector } = useSectorContext();

  console.log(isClicked);

  const handleClickSaveData = () => {
    setSector(data);
    setIsClicked(!isClicked);
  };

  return (
    <li>
      <button
        className={id === data.id && isClicked ? className : ''}
        onClick={handleClickSaveData}
      >
        sector {id}
      </button>
    </li>
  );
}

export default DashboardSector;
