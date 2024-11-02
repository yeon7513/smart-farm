import React from 'react';
import styles from './ChattingMessage.module.scss';
import { auth } from '../../../../../api/firebase';

// // 날짜 비교 함수 (같은 날짜인지 확인)
// const isSameDate = (date1, date2) => {
//   return (
//     date1.getFullYear() === date2.getFullYear() &&
//     date1.getMonth() === date2.getMonth() &&
//     date1.getDate() === date2.getDate()
//   );
// };

function ChattingMessage({ messages = []  }) {
  // 현재 로그인한 사용자의 UID 가져오기
  messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  
  return (
      <div className={styles.messageContainer}>

 <div className={styles.dateHeader}>
                {/* 년월일 표시 */}
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
                  msg.uid === auth.currentUser?.uid ? styles.managerMessage : styles.myMessage
                }`}
              >
                     <p>{msg.content}</p> {/* 메시지 내용 */}
              <small className={styles.messageTime}>
                {messageDate.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
                  </div>
                     )})}
    </div>
    );
    }
export default ChattingMessage;
