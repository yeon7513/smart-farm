import React from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';

function Sensor() {
  const { sector } = useSectorContext();

  return <div>Sensor</div>;
}

export default Sensor;
