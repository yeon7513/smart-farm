import React, { useState, useEffect } from "react";
import { auth, db } from "../../../api/firebase";
import { collection, getDocs, onSnapshot, query, orderBy, doc, updateDoc } from "firebase/firestore";
import styles from "./ChatRoomCare.module.scss";
import ChatRequestList from "./chat-request-list/ChatRequestList";

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // "chatRoom" 컬렉션을 참조
    const chatRoomRef = collection(db, "chatRoom");
  
    const unsubscribe = onSnapshot(chatRoomRef, async (snapshot) => {
      try {
        // 각 chatRoom 문서(사용자 이메일에 해당)를 순회
        const chatRequestsPromises = snapshot.docs.map(async (chatRoomDoc) => {
          const userEmail = chatRoomDoc.id;
          // 해당 사용자의 "chatContent" 컬렉션을 참조
          const chatContentRef = collection(db, "chatRoom", userEmail, "chatContent");
  
          const chatContentSnapshot = await getDocs(chatContentRef);
  
          const chatRequestPromises = chatContentSnapshot.docs.map(async (chatContentDoc) => {
            const chatRoomId = chatContentDoc.id;
            const chatData = chatContentDoc.data();
  
            // 각 chatRoomId에 해당하는 "message" 컬렉션을 참조
            const messagesRef = collection(db, "chatRoom", userEmail, "chatContent", chatRoomId, "message");
            const messageQuery = query(messagesRef, orderBy("createdAt", "asc"));
            const messageSnapshot = await getDocs(messageQuery);
  
            const messages = messageSnapshot.docs.map((messageDoc) => {
              const messageData = messageDoc.data();
              return {
                id: messageDoc.id,
                ...messageData,
                createdAt: messageData.createdAt instanceof Object ? messageData.createdAt.toMillis() : messageData.createdAt,
              };
            });
  
            return {
              id: chatRoomId,
              userEmail,
              chatTheme: chatData.chatTheme,
              activeYn: chatData.activeYn,
              chatEnd: chatData.chatEnd,
              createdAt: chatData.createdAt instanceof Object ? chatData.createdAt.toMillis() : chatData.createdAt,
              nickname: chatData.nickname,
              messages,
            };
          });
  
          return await Promise.all(chatRequestPromises);
        });
  
        let chatRequests = await Promise.all(chatRequestsPromises);
  
        // 최신순으로 정렬
        chatRequests = chatRequests.flat().sort((a, b) => b.createdAt - a.createdAt);
  
        setChatRequests(chatRequests);
        setLoading(false);
      } catch (error) {
        console.error("실시간 데이터 수신 중 오류 발생:", error);
      }
    });
  
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
