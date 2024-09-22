import React, { useState } from 'react'
import ChattingMessage from './chatting-message/ChattingMessage';
import FooterChattingForm from '../../chat-room-footer/footer-chatting-form/FooterChattingForm';


function LiveChatting() {
  const [messages, setMessages] = useState([]);

 // 새로운 메시지를 추가하는 함수
 const handleSendMessage = (message) => {
  setMessages([...messages, message]); // 새로운 메세지를 배열에 추가
 }

  return (
    <div>
      <ChattingMessage messages={messages} /> {/* 메세지 목록 전달 */}
        </div>
  )
}

export default LiveChatting