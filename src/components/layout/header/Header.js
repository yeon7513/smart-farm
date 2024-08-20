import React from 'react';
import Container from '../container/Container';
import Nav from './nav/Nav';

function Header(props) {
  return (
    <header>
      <Container>
        <h1>아이팜</h1>
        <Nav />
      </Container>
    </header>
  );
}

export default Header;
