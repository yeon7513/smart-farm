import React from "react";
import styles from "./ChatRequsetItem.module.scss";

function ChatRequestItem({ chat, onApprove }) {
  const { chatTheme, createdAt, nickname, activeYn, chatEnd } = chat;

  const getStatus = () => {
    if (activeYn === "N" && chatEnd === "N") return "신규";
    if (activeYn === "Y" && chatEnd === "N") return "진행 중";
    if (activeYn === "Y" && chatEnd === "Y") return "완료";
    return "미완";
  };

  const status = getStatus();

  return (
    <li className={styles.item}>
      <div className={styles.category}>{chatTheme}</div>
      <div className={styles.info}>
        <span className={styles.date}>
          {new Date(createdAt.seconds * 1000).toLocaleString()}  {/* Firestore 타임스탬프 변환 */}
        </span>
        <span className={styles.nickname}>{nickname}</span>
      </div>
      <div className={styles.status}>
        <span>{status}</span>
        {status === "신규" && (
          <button onClick={onApprove}>승인</button>  // 승인 버튼 클릭 시 활성화
        )}
      </div>
    </li>
  );
}

export default ChatRequestItem;
