import React from 'react';
import Container from '../../components/layout/container/Container';
import Title from '../../components/layout/title/Title';
import { simul } from '../../lib/intro';

function Simulation() {
  return (
    <>
      <Title {...simul} />
      <Container>Simulation</Container>
    </>
  );
}

export default Simulation;
