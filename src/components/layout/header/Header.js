import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../container/Container';
import styles from './Header.module.scss';
import Nav from './nav/Nav';

function Header() {
  return (
    <header>
      <Container className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">아이팜</Link>
        </h1>
        <Nav />
      </Container>
    </header>
  );
}

export default Header;
