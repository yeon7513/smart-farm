import React from 'react';
import { useParams } from 'react-router-dom';

function DashBoard() {
  const { id } = useParams();
  return <div>{id} DashBoard</div>;
}

export default DashBoard;
