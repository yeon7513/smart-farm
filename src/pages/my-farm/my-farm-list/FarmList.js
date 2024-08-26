import React from 'react';
import { Link, useParams } from 'react-router-dom';

function FarmList() {
  const { id } = useParams();
  return (
    <div>
      FarmList
      <Link to={`/my-farm/${id}`}>DashBoard 이동</Link>
    </div>
  );
}

export default FarmList;
