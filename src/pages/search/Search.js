import React from 'react';
import { Outlet } from 'react-router-dom';
import Title from '../../components/layout/title/Title';
import { search } from '../../lib/intro';

function Search() {
  return (
    <div>
      <Title {...search} />
      <Outlet />
    </div>
  );
}

export default Search;
