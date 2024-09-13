import React from 'react'
import styles from "./ChatRoomFooter.module.scss";

function ChatRoomFooter({openChatSupported}) {
  return (
    <div
    className={`${styles.footer} ${
        openChatSupported ? styles.footerDetailOption : ""
    }`}
  >
    {openChatSupported ? (
      <>
        버튼 클릭 시 상담이 신속히 연결되며, 상담 대기자가 많을 경우 시간이
        다소 소요될 수 있습니다.
      </>
    ) : (
      <>
        채팅 상담원 연결 시간은 오전 9시부터 오후 6시까지 운영되오니 많은
        참고 부탁드립니다.😊
      </>
    )}
  </div>
  )
}

export default ChatRoomFooter