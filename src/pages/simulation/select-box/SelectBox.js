import React from 'react';
import { Link } from 'react-router-dom';

function SelectBox({ item, id }) {
  return (
    <div>
      <Link to={`/simulation/${id}`}>{item}</Link>
    </div>
  );
}

export default SelectBox;
