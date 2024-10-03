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
  const [searchValue, setSearchValue] = useState(""); // 검색어 상태 추가

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

  // 안전하게 toLowerCase를 호출하기 위해 값 확인
  const safeString = (value) => (value ? value.toLowerCase() : "");

  // 날짜를 다양한 형식으로 처리
  const formatDate = (timestamp) => {
    if (!timestamp) return ""; // timestamp가 undefined인 경우 빈 문자열 반환

    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 앞에 0을 추가
    const day = date.getDate().toString().padStart(2, '0'); // 앞에 0을 추가

    // 'YYYY.MM.DD.' 형식으로 반환
    return `${year}.${month}.${day}.`;
  };

  // 검색어에 맞는 데이터 필터링
  const filteredChatRequests = chatRequests.filter((chat) => {
    const formattedDate = formatDate(chat.createdAt);

    // 검색어가 없는 경우 빈 문자열로 처리
    const cleanSearchValue = searchValue ? searchValue.replace(/^0+/, '') : ''; // 앞에 있는 0을 제거
    const cleanFormattedDate = formattedDate ? formattedDate.replace(/^0+/, '') : ''; // 앞에 있는 0을 제거

    return (
      safeString(chat.nickname).includes(safeString(searchValue)) ||
      cleanFormattedDate.includes(cleanSearchValue) || // 앞에 0을 없앤 값 비교
      safeString(chat.chatTheme).includes(safeString(searchValue)) ||
      chat.messages.some((msg) =>
        safeString(msg.content).includes(safeString(searchValue))
      )
    );
  });



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

  

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  
  return (
    <div className={styles.wrapper}>
      <h2>채팅 요청 관리</h2>
      <SearchBox 
      name={<TbMessageSearch />} 
      placeholder={"채팅 정보 검색"}
      value={searchValue} // 검색어 상태 연결
      onChange={handleSearchChange} // 입력 핸들러 연결
      
      />

      {/* ChatRequestList는 항상 렌더링 */}
      <ChatRequestList
        chatRequests={filteredChatRequests}
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
