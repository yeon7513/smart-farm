// LiveChatting.js
import React, { useState } from 'react';
import styles from './LiveChatting.module.scss';
import ChatInput from './ChatInput';

function LiveChatting() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    if (!message.trim()) return;

    // 사용자 메시지를 채팅에 추가
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: message, sender: 'user' },
    ]);

    // 상담사 응답을 시뮬레이션 (실제 응답 로직으로 대체)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now(), text: '상담원이 답변 중입니다...', sender: 'consultant' },
      ]);
    }, 1000);
  };

  return (
    <div className={styles.chattingWrapper}>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <div key={message.id} className={message.sender === 'user' ? styles.userMessage : styles.consultantMessage}>
            {message.text}
          </div>
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default LiveChatting;
