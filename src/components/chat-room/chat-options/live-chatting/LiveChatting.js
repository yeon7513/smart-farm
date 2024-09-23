import React, { useEffect, useState } from 'react';
import ChattingMessage from './chatting-message/ChattingMessage';
import FooterChattingForm from '../../chat-room-footer/footer-chatting-form/FooterChattingForm';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore'; // 필요한 Firestore 함수 가져오기
import { db } from '../../../../api/firebase'; // Firestore 초기화된 객체 가져오기

function LiveChatting({ messages, handleSendMessage }) {

  // // Firestore에서 실시간으로 메시지를 가져오는 함수
  // useEffect(() => {
  //   if (!chatRoomId) return; // chatRoomId가 없으면 리턴

  //   const q = query(
  //     collection(db, 'chatRoom', chatRoomId, 'message'), // Firestore 경로 설정
  //     orderBy('createdAt', 'asc') // 전송 시간 순으로 정렬
  //   );

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     const fetchedMessages = snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));
  //     setMessages(fetchedMessages); // 메시지 상태 업데이트
  //   });

  //   return () => unsubscribe(); // 컴포넌트가 언마운트되면 구독 해제
  // }, [chatRoomId]);


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
