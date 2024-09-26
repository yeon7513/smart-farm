import React, { useEffect, useState } from 'react';
import { TbMessageSearch } from 'react-icons/tb';
import SearchBox from '../../../components/search_box/SearchBox';
import styles from './ChatRoomCare.module.scss';
import { collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db, auth } from '../../../api/firebase';
import ChatRequestList from './chat-request-list/ChatRequestList';

function ChatRoomCare() {
  const [chatRequests, setChatRequests] = useState([]);

  useEffect(() => {
    const currentUserEmail = auth.currentUser?.email;
    if (!currentUserEmail) return;

    const q = query(
      collection(db, 'chatRoom', currentUserEmail, 'chatContent'),
      where('activeYn', '==', 'Y') // 활성화된 채팅 상담만 구독
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const requests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChatRequests(requests);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  const handleApproveChat = async (chatId) => {
    // 승인 후 Firestore에 'activeYn' 필드를 "Y"로 업데이트
    const chatDocRef = doc(db, 'chatRoom', auth.currentUser.email, 'chatContent', chatId);
    await updateDoc(chatDocRef, {
      activeYn: 'Y',
    });
  };


  return (
    <div className={styles.chatRoom}>
     <SearchBox name={<TbMessageSearch />} placeholder={'채팅방 검색'} />
     <ChatRequestList chatRequests={chatRequests} onApproveChat={handleApproveChat} />
</div>
 
  );
}


export default ChatRoomCare;
