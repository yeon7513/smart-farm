import React from 'react';
import styles from './ChatRequsetItem.module.scss';

function ChatRequestItem({ chat, onApprove }) {
  const { chatTheme, createdAt, nickname, status } = chat;
  
  return (
    <li className={styles.item}>
      <div className={styles.category}>{chatTheme}</div>
      <div className={styles.info}>
        <span className={styles.date}>{new Date(createdAt.seconds * 1000).toLocaleString()}</span> {/* Firestore의 타임스탬프 변환 */}
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <div className={styles.status}>
        <span>{status}</span>
        {status === '신규' && (
          <button onClick={onApprove}>승인</button>
        )}
      </div>
    </li>
  );
}

export default ChatRequestItem;
