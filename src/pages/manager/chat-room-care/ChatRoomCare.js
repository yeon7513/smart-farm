import React, { useState, useEffect } from "react";
import { db } from "../../../api/firebase";
import { collection, getDocs, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import styles from "./ChatRoomCare.module.scss";
import ChatRequestList from "./chat-request-list/ChatRequestList";

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const chatRoomRef = collection(db, "chatRoom");
    
    // Firestore에서 'chatRoom' 컬렉션 실시간 감시
    const unsubscribe = onSnapshot(chatRoomRef, async (snapshot) => {
      const chatRequestsPromises = snapshot.docs.map(async (chatRoomDoc) => {
        const userEmail = chatRoomDoc.id;
        // 사용자 이메일 추출 (컬렉션의 문서 ID가 이메일이라고 가정)
        
        const chatContentRef = collection(db, "chatRoom", userEmail, "chatContent");
        const chatContentSnapshot = await getDocs(chatContentRef);
        
        const chatRequestPromises = chatContentSnapshot.docs.map(async (chatContentDoc) => {
          const chatRoomId = chatContentDoc.id;
          const chatData = chatContentDoc.data();
          
          // 'message' 컬렉션에서 메시지 가져오기
          const messagesRef = collection(db, "chatRoom", userEmail, "chatContent", chatRoomId, "message");
          const messageQuery = query(messagesRef, orderBy("createdAt", "asc"));
          const messageSnapshot = await getDocs(messageQuery);
          
          const messages = messageSnapshot.docs.map((messageDoc) => ({
            id: messageDoc.id,
            ...messageDoc.data(),
          }));
          
          return {
            id: chatRoomId,
            userEmail,
            chatTheme: chatData.chatTheme,
            activeYn: chatData.activeYn,
            chatEnd: chatData.chatEnd,
            createdAt: chatData.createdAt,
            nickname: chatData.nickname,
            messages,
          };
        });
        
        return await Promise.all(chatRequestPromises);
      });
      
      const chatRequests = await Promise.all(chatRequestsPromises);
      setChatRequests(chatRequests);
      setLoading(false); // 로딩 완료
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  const handleApproveChat = async (chatId, userEmail) => {
    try {
      const chatRoomRef = doc(db, "chatRoom", userEmail, "chatContent", chatId);
      await updateDoc(chatRoomRef, {
        activeYn: "Y",
        chatEnd: "N",
      });
      console.log(`채팅(${chatId}) 승인됨`);
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
      {chatRequests.length > 0 ? (
        <ChatRequestList chatRequests={chatRequests} onApproveChat={handleApproveChat} />
      ) : (
        <p>채팅 요청이 없습니다.</p>
      )}
    </div>
  );
}

export default ChatRoomCare;
