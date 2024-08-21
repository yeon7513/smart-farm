import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import Title from '../../components/layout/title/Title';
import { info } from '../../lib/intro';

function Info() {
  return (
    <div>
      <Title {...info} />
      <Container>
        <Link to="/info/usage-status">이용현황</Link>
        <Link to="/info/simulation">시뮬레이션</Link>
        <Outlet />
      </Container>
    </div>
  );
}

export default Info;
