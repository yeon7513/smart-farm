import React from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';
import { renameOptions } from '../../../../../../utils/renameOptions';
import ControlItem from './control-item/ControlItem';

function ControlBox() {
  const { sector } = useSectorContext();

  const options = Object.keys(sector.control).map((key) => renameOptions(key));

  return (
    <div>
      {options.map((option, idx) => (
        <ControlItem key={idx} option={option} />
      ))}
    </div>
  );
}

export default ControlBox;
