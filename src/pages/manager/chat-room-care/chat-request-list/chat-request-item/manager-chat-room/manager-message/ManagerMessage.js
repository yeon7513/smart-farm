import React from 'react'
import styles from './ManagerMessage.module.scss'
import { auth } from '../../../../../../../api/firebase';


// 날짜 비교 함수 (같은 날짜인지 확인)
const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

function ManagerMessage({ messages = [] }) {
  let previousDate = null;

  // messages가 빈 배열일 때 map 호출 오류를 방지하기 위해 기본값 설정
  return (
    <div>
      {messages.map((msg, index) => {
        const messageDate = new Date(msg.createdAt);
        const showDateHeader = !previousDate || !isSameDate(previousDate, messageDate);
        previousDate = messageDate;

        return (
          <div key={index} className={styles.messageWrapper}>
            {showDateHeader && (
              <div className={styles.dateHeader}>
                {messageDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            )}

            <div className={styles.messageContainer}>
              <div
                className={`${styles.messageContent} ${
                  msg.uid === auth.currentUser?.uid ? styles.userMessage : styles.managerMessage
                }`}
              >
                <p>{msg.content}</p>
              </div>

              <small className={styles.messageTime}>
                {messageDate.toLocaleTimeString('ko-KR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </small>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ManagerMessage
