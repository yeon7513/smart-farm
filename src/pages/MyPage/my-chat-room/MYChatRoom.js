import React from 'react'
import Container from '../../../components/layout/container/Container'
import styles from './MYChatRoom.module.scss';

function MYChatRoom() {
  return (
       <Container className={styles.container}>
    <div className={styles.main}>
      <div>상담내역</div>
    </div>
  </Container>
  )

}

export default MYChatRoom