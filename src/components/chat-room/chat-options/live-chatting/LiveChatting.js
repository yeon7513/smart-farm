import React, { useEffect, useState } from 'react';
import ChattingMessage from './chatting-message/ChattingMessage';
import FooterChattingForm from '../../chat-room-footer/footer-chatting-form/FooterChattingForm';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore'; // 필요한 Firestore 함수 가져오기
import { db } from '../../../../api/firebase'; // Firestore 초기화된 객체 가져오기

function LiveChatting({ messages, handleSendMessage }) {

  return (
    <div>
      <ChattingMessage 
      messages={messages} 
      onSendMessage={handleSendMessage}
      /> {/* 메시지 목록 전달 */}

    </div>
  );
}

export default LiveChatting;
