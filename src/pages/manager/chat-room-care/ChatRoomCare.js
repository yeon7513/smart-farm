import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // 중복된 useDispatch import 제거
import { setMessages } from '../../../store/chat-room/chatRoomSlice';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, fetchChatroomId } from '../../../api/firebase';
import styles from './ChatRoomCare.module.scss';


function ChatRoomCare({ userEmail }) {
  const dispatch = useDispatch();
  const chatroomId = useSelector((state) => state.chatRoom.chatroomId); // Redux에서 chatroomId 가져오기

  useEffect(() => {
    if (!chatroomId) return;

    const q = query(
      collection(db, 'chatbot', userEmail, 'chatroom1', chatroomId, 'message'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      dispatch(setMessages(fetchedMessages)); // 상태 업데이트
    });

    return () => unsubscribe();
  }, [chatroomId, userEmail, dispatch]);

  // Firestore에서 chatroomId 가져오기
  useEffect(() => {
    async function exampleUsage() {
      const email = 'yjw1732@gmail.com'; // 예시 이메일
      const chatroomId = await fetchChatroomId(email);
    
      if (chatroomId) {
        console.log('Fetched chatroomId:', chatroomId);
        // chatroomId로 Firestore에서 해당 방의 데이터를 처리하는 로직 추가 가능
      } else {
        console.log('No chatroom found for this user.');
      }
    }

    exampleUsage();
  }, [dispatch]);

  return (
    <div className={styles.chatRoom}>
      {/* ChatRequestList 렌더링 */}
    </div>
  );
}

export default ChatRoomCare;
