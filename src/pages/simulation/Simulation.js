import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import SelectBox from './select-box/SelectBox';

const items = ['토마토', '딸기', '파프리카'];

function Simulation() {
  return (
    <>
      <Container>
        <h2>서비스 체험</h2>
        {items.map((item, idx) => (
          <SelectBox key={idx} item={item} id={idx} />
        ))}
        <Outlet />
      </Container>
    </>
  );
}

export default Simulation;
