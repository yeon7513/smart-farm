import React, { useState } from "react";
import styles from "./ChatRequestItem.module.scss";

function ChatRequestItem({ chat, onApprove }) {
  const { chatTheme, createdAt, activeYn, chatEnd, nickname } = chat;

  const [status, setStatus] = useState(getStatus());

  function getStatus() {
    if (activeYn === "N" && chatEnd === "N") return "신규";
    if (activeYn === "N" && chatEnd === "Y") return "미완료";
    if (activeYn === "Y" && chatEnd === "N") return "진행 중";
    if (activeYn === "Y" && chatEnd === "Y") return "완료";
    return "알 수 없음";
  }

  const handleStatusClick = () => {
    if (status === "신규") {
      setStatus("진행 중");
      onApprove();
    }
  };

  // createdAt이 Timestamp인 경우 밀리세컨즈로 변환
  const formatDate = (createdAt) => {
    if (createdAt?.seconds) {
      return new Date(createdAt.seconds * 1000).toLocaleString(); // 밀리세컨즈로 변환하여 출력
    } else if (typeof createdAt === "number") {
      return new Date(createdAt).toLocaleString(); // 밀리세컨즈로 받은 경우
    } else {
      return "생성일 없음";
    }
  };

  return (
    <li className={styles.item}>
      <div className={styles.container}>
        <div className={styles.category}>{chatTheme}</div>
        <div className={styles.nickname}>{nickname || "닉네임 없음"}</div>
        <div className={styles.date}>
          {formatDate(createdAt)}
        </div>
        <div className={styles.status}>
          {status === "신규" ? (
            <button
              className={`${styles.statusLabel} ${styles.new}`}
              onClick={handleStatusClick}
            >
              {status}
            </button>
          ) : (
            <span className={`${styles.statusLabel}`}>
              {status}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export default ChatRequestItem;