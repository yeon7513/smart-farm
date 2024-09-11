import React from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';

function ControlBox() {
  const { sector } = useSectorContext();
  console.log(sector.control);

  return <div>ControlBox</div>;
}

export default ControlBox;
