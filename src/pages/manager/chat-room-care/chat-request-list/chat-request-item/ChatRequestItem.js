import React from 'react';
import styles from './ChatRequsetItem.module.scss';

function ChatRequestItem({ chat, onApprove }) {
  const { chatTheme, createdAt, nickname, status } = chat;
  
  return (
    <li className={styles.item}>
      <div className={styles.category}>{chatTheme}</div>
      <div className={styles.info}>
        <span className={styles.date}>{createdAt}</span>
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
