import React from 'react'
import styles from './ManagerMessage.module.scss'
import { auth } from '../../../../../../../api/firebase';

// 날짜 비교 함수 (같은 날짜인지 확인)
// const isSameDate = (date1, date2) => {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   );
// };

function ManagerMessage({ messages = [] }) {
  // 메시지를 시간 순서대로 정렬
  messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className={styles.messageContainer}>

      <div className={styles.dateHeader}>
        {new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>

      {messages.map((msg, index) => {
        const messageDate = new Date(msg.createdAt);

        return (
          <div key={index} className={`${styles.messageContent} ${
            msg.uid === auth.currentUser?.uid ? styles.managerMessage : styles.userMessage
          }`}>

            <p>{msg.content}</p>
            <small className={styles.messageTime}>
              {messageDate.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        )
      })}

    </div>
  );
}

export default ManagerMessage;
