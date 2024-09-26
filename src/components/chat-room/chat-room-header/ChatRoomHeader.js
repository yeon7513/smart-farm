import React from 'react';
import backIcon from "../../../assets/main/backImg.svg";
import closeIcon from "../../../assets/main/closeImg.svg";
import styles from "./ChatRoomHeader.module.scss";

function ChatRoomHeader({ isLiveChatOpend, handleBackButtonClick, handleClose, isTransitioningToLiveChat, endChat }) {
  return (
    <div
      className={`${styles.header} 
        ${isLiveChatOpend ? styles.headerDetailOption : ""}  
        ${isTransitioningToLiveChat ? styles.headerLiveChatting : "" }`}
    >
      {isTransitioningToLiveChat ? (
        <>
          <button className={styles.backBtn} onClick={handleBackButtonClick}>
            <img
              src={backIcon}
              alt="뒤로 가기"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <h2 className={styles.chattingTitle}>채팅 상담</h2>
          <button className={styles.closeBtn} onClick={() => { handleClose(); endChat(); }}>
            <img src={closeIcon} alt="닫기" style={{ width: "16px", height: "16px" }} />
          </button>
        </>
      ) : isLiveChatOpend ? (
        <>
          <button className={styles.backBtn} onClick={handleBackButtonClick}>
            <img
              src={backIcon}
              alt="뒤로 가기"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <h2 className={styles.chatDetailTitle}>세부 선택</h2>
          <button className={styles.closeBtn} onClick={() => { handleClose(); endChat(); }}>
            <img
              src={closeIcon}
              alt="닫기"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
        </>
      ) : (
        <>
          <h2 className={styles.chattingTitle}>아이팜 채팅상담</h2>
          <button className={styles.closeBtn} onClick={() => { handleClose(); endChat(); }}>
            <img
              src={closeIcon}
              alt="닫기"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
          <p className={styles.guideText}>무엇을 도와드릴까요?</p>
        </>
      )}
    </div>
  );
}

export default ChatRoomHeader;
