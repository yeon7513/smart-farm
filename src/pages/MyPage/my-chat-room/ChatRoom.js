import React from 'react'
import Container from '../../../components/layout/container/Container'
import styles from './ChatRoom.module.scss';

function ChatRoom() {
  return (
    <Container className={styles.container}>
    <div className={styles.main}>
      <div>상담내역</div>
    </div>
  </Container>
  )
}

export default ChatRoom