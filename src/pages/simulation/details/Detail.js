import React from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  return (
    <div>
      <h2>Detail</h2>
      <p>{id}</p>
    </div>
  );
}

export default Detail;
