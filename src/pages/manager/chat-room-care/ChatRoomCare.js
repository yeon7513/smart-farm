import React, { useEffect, useState } from "react";
import { TbMessageSearch } from "react-icons/tb";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./ChatRoomCare.module.scss";
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  orderBy,
} from "firebase/firestore";
import { db, auth } from "../../../api/firebase";
import ChatRequestList from "./chat-request-list/ChatRequestList";

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
  //  유스 이펙트를 만들어서 할당을 함 
    const q = query(
    // q 함수를 만들어 쿼리에 할당함 
      collection(db, "chatRequests"),
      where("activeYn", "in", ["N", "Y"]),
      orderBy("createdAt", "desc")
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // 구독해제 함수를 만들어 온스냅샷에 할당하고 q와 스냅샷을 파라미터로 사용한다. 
      const requests = snapshot.docs.map((doc) => ({
        // 요청함수를 만들어 맵함수를 파라미터로 사용해 할당한다. 
        id: doc.id,
        ...doc.data(),
      }));
      console.log('채팅 요청 목록:', requests); // 로그 추가
      setChatRequests(requests);
    });
  
    return () => unsubscribe();
  }, []);

  const handleApproveChat = async (chatRoomId) => {
    // 챗룸아이디를 파이어베이스에서 파라미터로 가져와 함수를 만든다.
    const currentUser = auth.currentUser;
    // 계정을 가져온다.
    const userEmail = currentUser.email;
    // 유저이메일을 가져온다. 

    try {
      // 트라이 캐치문법을 사용한다. 
      const chatDocRef = doc(db, "chatRoom", userEmail, "chatContent", chatRoomId);
      // 대화접근함수를 만들어 대화내용을 가져온다.
      // 승인 후 activeYn 필드 업데이트
      await updateDoc(chatDocRef, {
        // 업데이트함수를 파이어베이스에서 가져와서 접근함수를 파라미터로 사용해서 
        activeYn: "Y"
        // activeYn을 N에서 Y로 가져온다. 
      });
  
      console.log("채팅이 승인되었습니다:", chatRoomId);
    } catch (error) {
      console.error("채팅 승인 중 오류 발생:", error.message);
    }
  };

  return (
    <div className={styles.chatRoom}>
      <SearchBox name={<TbMessageSearch />} placeholder={"채팅방 검색"} />
      <ChatRequestList
        chatRequests={chatRequests}
        onApproveChat={handleApproveChat}
      />
    </div>
  );
}

export default ChatRoomCare;
