import React from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';

function DashboardSector({ id, data, className }) {
  const { setSector } = useSectorContext();

  const handleClickSaveData = () => {
    setSector(data);
  };

  return (
    <li>
      <button
        // className={id === data.id ? className : ''}
        onClick={handleClickSaveData}
      >
        sector {id}
      </button>
      {/* 클릭하면 해당 docId에 해당하는 옵션이 뜨고 다시 클릭하면 안 뜨고
      {isClicked && (
        <>
          {data.동수}동 &nbsp; 부가옵션: {data.control}
          &nbsp; 습도: {data.humidity}% &nbsp; 온도: {data.temperature}℃
        </>
      )} */}
    </li>
  );
}

export default DashboardSector;
