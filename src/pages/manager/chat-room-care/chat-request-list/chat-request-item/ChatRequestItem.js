import React from "react";
import styles from "../chat-request-item/ChatRequsetItem.module.scss";

function ChatRequestItem({ chat, onApprove }) {
  const { chatTheme, createdAt, activeYn, chatEnd, nickname, messages = [] } = chat;

  const getStatus = () => {
    if (activeYn === "N" && chatEnd === "N") return "신규";
    if (activeYn === "N" && chatEnd === "Y") return "미완료";
    if (activeYn === "Y" && chatEnd === "N") return "진행 중";
    if (activeYn === "Y" && chatEnd === "Y") return "완료";
    return "미완";
  };

  const status = getStatus();

  return (
    <li className={styles.item}>
      <div className={styles.category}>{chatTheme}</div>
      <div className={styles.info}>
        <span className={styles.nickname}>{nickname || "닉네임 없음"}</span>
        <span className={styles.date}>
          {createdAt ? new Date(createdAt.seconds * 1000).toLocaleString() : "생성일 없음"}
        </span>
      </div>
      <div className={styles.status}>
        <span>{status}</span>
        {status === "신규" && (
          <button onClick={onApprove}>승인</button>
        )}
      </div>
      <div className={styles.messages}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className={styles.message}>
              <span>{new Date(message.createdAt.seconds * 1000).toLocaleString()} - {message.content}</span>
            </div>
          ))
        ) : (
          <p>메시지가 없습니다.</p>
        )}
      </div>
    </li>
  );
}

export default ChatRequestItem;
