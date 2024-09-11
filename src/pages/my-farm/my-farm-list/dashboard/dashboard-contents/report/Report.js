import React from 'react';
import { useSectorContext } from '../../../../../../context/SectorContext';

function Report() {
  const { sector } = useSectorContext();

  return <div>Report</div>;
}

export default Report;
