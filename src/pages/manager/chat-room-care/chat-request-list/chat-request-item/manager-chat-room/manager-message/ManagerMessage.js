import React from 'react'
import styles from './ManagerMessage.module.scss'


// 날짜 비교 함수 (같은 날짜인지 확인)
const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

function ManagerMessage({ messages }) {
  let previousDate = null;
  
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
              {/* 년월일 표시 */}
              {messageDate.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          )}

          <div className={styles.messageContainer}>
            {/* 본인의 메시지와 관리자의 메시지를 구분 */}
            <div
              className={`${styles.messageContent} ${
                msg.uid === 'auth.currentUser.uid' ? styles.managerMessage : styles.myMessage
              }`}
            >
              <p>{msg.content}</p> {/* 메시지 내용 */}
            </div>

            {/* 메시지 전송 시간 (시간만 표시) */}
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
  )
}

export default ManagerMessage
