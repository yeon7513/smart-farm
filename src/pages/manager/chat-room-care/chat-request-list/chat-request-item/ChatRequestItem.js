import React, { useState } from "react";
import styles from "./ChatRequestItem.module.scss";

function ChatRequestItem({ chat, onApprove }) {
  const { chatTheme, createdAt, activeYn, chatEnd, nickname } = chat;

  // 버튼 상태 관리
  const [status, setStatus] = useState(getStatus());

  // 채팅 상태를 반환하는 함수
  function getStatus() {
    if (activeYn === "N" && chatEnd === "N") return "신규";
    if (activeYn === "N" && chatEnd === "Y") return "미완료";
    if (activeYn === "Y" && chatEnd === "N") return "진행 중";
    if (activeYn === "Y" && chatEnd === "Y") return "완료";
    return "알 수 없음";
  }

  // 버튼 클릭 시 "진행 중"으로 변경하는 함수
  const handleStatusClick = () => {
    if (status === "신규") {
      setStatus("진행 중");
      onApprove(); // 승인 함수 호출
    }
  };

  return (
    <li className={styles.item}>
      {/* 가로로 나열된 구성 */}
      <div className={styles.container}>
        <div className={styles.category}>{chatTheme}</div>
        <div className={styles.nickname}>{nickname || "닉네임 없음"}</div>
        <div className={styles.date}>
          {createdAt?.seconds
            ? new Date(createdAt.seconds * 1000).toLocaleString()
            : "생성일 없음"}
        </div>
        <div className={styles.status}>
          {/* 상태 버튼 색상 처리 및 클릭 가능하게 변경 */}
          {status === "신규" ? (
            <button
              className={`${styles.statusLabel} ${styles.new}`}
              onClick={handleStatusClick}
            >
              {status}
            </button>
          ) : (
            <span
              className={`${styles.statusLabel} ${
                status === "신규" ? styles.new : ""
              }`}
            >
              {status}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

export default ChatRequestItem;
