import React, { useEffect, useState } from 'react';
import { TbMessageSearch } from 'react-icons/tb';
import { db } from '../../../api/firebase';
import { collection, query, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './ChatRoomCare.module.scss';
import ChatRequestList from './chat-request-list/ChatRequestList';

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'chatbot'), where('activeYn', '==', 'N'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setChatRequests(requests);
    });
    return () => unsubscribe();
  }, []);

  const approveChat = async (chatId) => {
    const chatDocRef = doc(db, 'chatbot', 'yjw1732@gmail.com', 'chatroom1', chatId);
    await updateDoc(chatDocRef, {
      activeYn: 'Y',
    });
  };

  return (
    <div className={styles.chatRoom}>
      <SearchBox name={<TbMessageSearch />} placeholder={'채팅방 검색'} />
      <h2>상담 요청 목록</h2>
      <ChatRequestList 
      chatRequests={chatRequests} 
      onApproveChat={approveChat} 
      />
    </div>
  );
}

export default ChatRoomCare;
