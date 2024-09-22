import React, { useState } from 'react';
import styles from './FooterChattingForm.module.scss';
import * as FaIcons from "react-icons/fa";


function FooterChattingForm() {
  const [message, setMessage] = useState('');

  // 메시지 전송 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // 메시지를 서버로 전송하거나 처리하는 로직
      console.log('전송된 메시지:', message);
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };

  return (
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
  );
}

export default FooterChattingForm;
