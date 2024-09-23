import React, { useEffect, useState } from 'react'
import ChattingMessage from './chatting-message/ChattingMessage';
import FooterChattingForm from '../../chat-room-footer/footer-chatting-form/FooterChattingForm';
import { Firestore } from 'firebase/firestore';


function LiveChatting() {
  const [messages, setMessages] = useState([]);

  // chatRoomId 가져올 수 있어야 됨 

    // Firestore에서 실시간으로 메시지를 가져오는 함수
  //   useEffect(() => {
  //     const unsubscribe = Firestore
  //       .collection('chatRoom')
  //       .doc(chatRoomId) // 특정 채팅방
  //       .collection('message') // 메시지 컬렉션
  //       .orderBy('createdAt', 'asc') // 전송 시간 순으로 정렬
  //       .onSnapshot((snapshot) => {
  //         const fetchedMessages = snapshot.docs.map(doc => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setMessages(fetchedMessages); // 메시지 상태 업데이트
  //       });


  //   return () => unsubscribe(); // 컴포넌트가 언마운트되면 구독 해제
  // }, [chatRoomId]);

  // // 메시지 전송 함수
  const handleSendMessage = async (message) => {
    const newMessage = {
      content: message,
      createdAt: new Date(),
      uid: 'uid', // 유저 고유 ID
    };

    await Firestore
    .collection('chatRoom')
// .doc(chatRoomId)
.collection('message')
.add(newMessage);; // Firestore에 메시지 추가
  };

  return (
    <div>
      <ChattingMessage messages={messages} /> {/* 메세지 목록 전달 */}
        </div>
  )
}

export default LiveChatting