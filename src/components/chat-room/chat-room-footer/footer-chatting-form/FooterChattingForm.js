import React, { useState } from 'react';
import styles from './FooterChattingForm.module.scss';
import * as FaIcons from "react-icons/fa";


function FooterChattingForm({messages = [], onSendMessage}) {
  const [message, setMessage] = useState('');

  // 메시지 전송 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // 메시지를 서버로 전송하거나 처리하는 로직
      console.log('전송된 메시지:', message);
      onSendMessage(message); // 상위 컴포넌트로 메세지 전달 
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };
  // 상담이 종료되었는지 확인
  const isChatEnded = messages.some((msg) => msg.id === 'endMessage');

  return (
    <div>
    {isChatEnded ? (
      <div className={styles.endMessage}>상담이 종료되었습니다</div>  // 상담 종료 메시지 표시
    ) : (
    <form className={styles.chattingForm} onSubmit={handleSubmit}>
      <input
      className={styles.input}
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
      />
      <button type="submit" className={styles.submitButton}>
      <FaIcons.FaPaperPlane />
      </button>
    </form>
  )}
  </div>
  );
}

export default FooterChattingForm;
