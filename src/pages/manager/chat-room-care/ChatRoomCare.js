import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { TbMessageSearch } from "react-icons/tb";
import { db } from "../../../api/firebase";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./ChatRoomCare.module.scss";
import ChatRequestList from "./chat-request-list/ChatRequestList";
import ManagerChatRoom from "./chat-request-list/chat-request-item/manager-chat-room/ManagerChatRoom"; // 채팅방 컴포넌트 임포트

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChat, setActiveChat] = useState(null); // 활성화된 채팅 정보 저장

  useEffect(() => {
    const chatRoomRef = collection(db, "chatRoom");
  
    // Firestore 실시간 데이터 구독
    const unsubscribe = onSnapshot(chatRoomRef, async (snapshot) => {
      try {
        const chatRequestsPromises = snapshot.docs.map(async (chatRoomDoc) => {
          const userEmail = chatRoomDoc.id;
  
          const chatContentRef = collection(
            db,
            "chatRoom",
            userEmail,
            "chatContent"
          );
          const chatContentSnapshot = await getDocs(chatContentRef);
  
          const chatRequestPromises = chatContentSnapshot.docs.map(
            async (chatContentDoc) => {
              const chatRoomId = chatContentDoc.id;
              const chatData = chatContentDoc.data();
  
              // 1시간 경과 체크 및 상태 업데이트
              const createdAt =
                chatData.createdAt instanceof Object
                  ? chatData.createdAt.toMillis()
                  : chatData.createdAt;
              const now = Date.now();
              const oneHour = 60 * 60 * 1000; 
              // const oneMinute = 60 * 1000; // 1분 (60초 * 1000밀리초)
              // const twentyMinute = 60 * 1000 * 20; // 20분(60초 * 1000밀리초)
        
  
              if (
                now - createdAt >= oneHour &&
                chatData.activeYn === "Y" &&
                chatData.chatEnd === "N"
              ) {
                const chatRoomRef = doc(
                  db,
                  "chatRoom",
                  userEmail,
                  "chatContent",
                  chatRoomId
                );
                await updateDoc(chatRoomRef, {
                  chatEnd: "Y",
                });
                console.log(
                  `1시간이 지나 상태가 완료로 변경된 채팅: ${chatRoomId}`
                );
              }
  
              // 메시지 데이터를 가져옴
              const messagesRef = collection(
                db,
                "chatRoom",
                userEmail,
                "chatContent",
                chatRoomId,
                "message"
              );
              const messageQuery = query(
                messagesRef,
                orderBy("createdAt", "asc")
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
                createdAt,
                nickname: chatData.nickname,
                messages,
              };
            }
          );
  
          return await Promise.all(chatRequestPromises);
        });
  
        let chatRequests = await Promise.all(chatRequestsPromises);
        chatRequests = chatRequests.flat().sort((a, b) => b.createdAt - a.createdAt);
  
        setChatRequests(chatRequests);
        setLoading(false); // 로딩 상태를 false로 설정
      } catch (error) {
        console.error("실시간 데이터 수신 중 오류 발생:", error);
      }
    });
  
    // 컴포넌트 언마운트 시 구독 해제
    return () => unsubscribe();
  }, []);

  const handleApproveChat = async (chatId, userEmail) => {
    try {
      const chatRoomRef = doc(db, "chatRoom", userEmail, "chatContent", chatId);
      await updateDoc(chatRoomRef, {
        activeYn: "Y",
        chatEnd: "N",
      });
      console.log(`채팅(${chatId}) 승인됨`);

      // 승인 후 해당 채팅을 활성화하여 열림
      setActiveChat({ chatId, userEmail });
    } catch (error) {
      console.error("채팅 승인 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  
  return (
    <div className={styles.wrapper}>
      <h2>채팅 요청 관리</h2>
      <SearchBox name={<TbMessageSearch />} placeholder={"채팅 요청 검색"} />

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
