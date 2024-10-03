import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { TbMessageSearch } from 'react-icons/tb';
import { auth, db } from '../../../api/firebase';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './ChatRoomCare.module.scss';
import ChatRequestList from './chat-request-list/ChatRequestList';
import ManagerChatRoom from './chat-request-list/chat-request-item/manager-chat-room/ManagerChatRoom'; // 채팅방 컴포넌트 임포트

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // 활성화된 채팅 정보 저장

  useEffect(() => {
    const chatRoomRef = collection(db, 'chatRoom');

    const unsubscribe = onSnapshot(chatRoomRef, async (snapshot) => {
      try {
        const chatRequestsPromises = snapshot.docs.map(async (chatRoomDoc) => {
          const userEmail = chatRoomDoc.id;
          const chatContentRef = collection(
            db,
            'chatRoom',
            userEmail,
            'chatContent'
          );

          const chatContentSnapshot = await getDocs(chatContentRef);

          const chatRequestPromises = chatContentSnapshot.docs.map(
            async (chatContentDoc) => {
              const chatRoomId = chatContentDoc.id;
              const chatData = chatContentDoc.data();

              const messagesRef = collection(
                db,
                'chatRoom',
                userEmail,
                'chatContent',
                chatRoomId,
                'message'
              );
              const messageQuery = query(
                messagesRef,
                orderBy('createdAt', 'asc')
              );
              const messageSnapshot = await getDocs(messageQuery);

              const messages = messageSnapshot.docs.map((messageDoc) => {
                const messageData = messageDoc.data();
                return {
                  id: messageDoc.id,
                  ...messageData,
                  createdAt:
                    messageData.createdAt instanceof Object
                      ? messageData.createdAt.toMillis()
                      : messageData.createdAt,
                };
              });

              return {
                id: chatRoomId,
                userEmail,
                chatTheme: chatData.chatTheme,
                activeYn: chatData.activeYn,
                chatEnd: chatData.chatEnd,
                createdAt:
                  chatData.createdAt instanceof Object
                    ? chatData.createdAt.toMillis()
                    : chatData.createdAt,
                nickname: chatData.nickname,
                messages,
              };
            }
          );

          return await Promise.all(chatRequestPromises);
        });

        let chatRequests = await Promise.all(chatRequestsPromises);

        chatRequests = chatRequests
          .flat()
          .sort((a, b) => b.createdAt - a.createdAt);

      // 새로운 요청 리스트가 들어오면 기존 요청을 대체하여 상태를 업데이트
      setChatRequests(
        chatRequests
          .flat()
          .sort((a, b) => b.createdAt - a.createdAt) // 최신 요청이 위로 오도록 정렬
      );
        setLoading(false);
      } catch (error) {
        console.error('실시간 데이터 수신 중 오류 발생:', error);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleApproveChat = async (chatId, userEmail) => {
    try {
      const chatRoomRef = doc(db, 'chatRoom', userEmail, 'chatContent', chatId);
      await updateDoc(chatRoomRef, {
        activeYn: 'Y',
        chatEnd: 'N',
      });
      console.log(`채팅(${chatId}) 승인됨`);

      // 승인 후 해당 채팅을 활성화하여 열림
      setActiveChat({ chatId, userEmail });
    } catch (error) {
      console.error('채팅 승인 중 오류 발생:', error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  // 메시지 전송 함수
  const handleSendMessage = async (chatId, userEmail, messageContent) => {
    try {
      const messagesRef = collection(
        db,
        'chatRoom',
        userEmail,
        'chatContent',
        chatId,
        'message'
      );

      // 메시지 데이터 추가
      await addDoc(messagesRef, {
        content: messageContent,
        createdAt: Date.now(),
        uid: auth.currentUser.uid, // 관리자의 uid (Firebase 인증된 유저)
      });

      console.log('관리자 메시지 전송 성공');
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error);
    }
  };

  return (
    <div className={styles.wrapper}>
    <h2>채팅 요청 관리</h2>
    <SearchBox name={<TbMessageSearch />} placeholder={'채팅 요청 검색'} />

    {/* ChatRequestList는 항상 렌더링 */}
    <ChatRequestList
      chatRequests={chatRequests}
      onApproveChat={handleApproveChat}
    />

    {/* ManagerChatRoom을 상태에 따라 오버레이로 렌더링 */}
    {activeChat && (
      <div className={styles.managerChatOverlay}>
        <ManagerChatRoom
          chatId={activeChat.chatId}
          userEmail={activeChat.userEmail}
        />
      </div>
    )}
  </div>
);
}

export default ChatRoomCare;
