import React from 'react';
import Container from '../../layout/container/Container';
import styles from './Chatbot.module.scss';

function Chatbot(props) {
  return (
    <Container className={styles.container}>
      <div className={styles.main}>
        <div>상담내역</div>
      </div>
    </Container>
  );
}

export default Chatbot;
