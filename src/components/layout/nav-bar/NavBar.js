import React from 'react';
import Container from '../container/Container';
import styles from './NavBar.module.scss';

function NavBar() {
  return (
    <div className={styles.bar}>
      <Container>NavBar</Container>
    </div>
  );
}

export default NavBar;
