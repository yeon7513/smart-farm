// ChatInput.js
import React, { useState } from 'react';
import styles from './ChatInput.module.scss';

function ChatInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    onSendMessage(inputValue);
    setInputValue(''); // 전송 후 입력 필드 초기화
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className={styles.chatInputWrapper}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className={styles.inputField}
        placeholder="메시지를 입력하세요..."
      />
      <button className={styles.sendButton} onClick={handleSendClick}>
        전송
      </button>
    </div>
  );
}

export default ChatInput;
