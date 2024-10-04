import React, { useEffect, useState } from 'react';
import styles from './ManagerChatRoom.module.scss';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../../../../api/firebase';
import closeIcon from "../../../../../../assets/main/closeImg.svg";
import ManagerMessage from './manager-message/ManagerMessage';
import { FaPaperPlane } from 'react-icons/fa';

function ManagerChatRoom({ chatId, userEmail }) {
    const [isChatRoomOpened, setIsChatRoomOpened] = useState(true);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    
    

    useEffect(() => {
      if (!chatId || !userEmail) return;
    
      const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatId, "message");
      const unsubscribe = onSnapshot(messageRef, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt;
    
          return {
            id: doc.id,
            ...data,
            // createdAt이 객체일 경우 처리 (밀리세컨즈로 변환)
            createdAt: createdAt instanceof Object && createdAt.seconds
            ? new Date(createdAt.seconds * 1000)
            : new Date(createdAt), // 이미 밀리세컨즈로 저장된 경우
          };
        });
        setMessages(newMessages);
      });
    
      return () => unsubscribe();
    }, [chatId, userEmail]);

    const handleSendMessage = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser || !message.trim()) return;

      const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatId, "message");
      await addDoc(messageRef, {
        content: message,
        createdAt: Date.now(), 
        uid: currentUser.uid,
      });

      setMessage(''); // 메시지 입력 필드 초기화
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      handleSendMessage(); // 메시지 전송
    };

    const handleClose = async () => {
      setIsChatRoomOpened(false); // 챗룸 닫기
      
      try {
        // Firestore에서 해당 채팅방의 chatEnd 상태를 'Y'로 변경
        const chatRoomRef = doc(db, 'chatRoom', userEmail, 'chatContent', chatId);
        await updateDoc(chatRoomRef, {
          chatEnd: 'Y',
        });
      } catch (error) {
        console.error('상담 종료 중 오류 발생:', error);
      }
    };
  
    if (!isChatRoomOpened) return null;



    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h2 className={styles.chattingTitle}>아이팜 채팅상담</h2>
          <button className={styles.closeBtn} onClick={handleClose}>
            <img src={closeIcon} alt="닫기" style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
        
        {/* 메시지 리스트 영역 */}
        <div className={styles.content}>
          <ManagerMessage messages={messages} />
        </div>

        {/* 메시지 입력 폼 */}
        <div className={styles.footer}>
          <form className={styles.chattingForm} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="메시지를 입력하세요..."
            />
            <button type="submit" className={styles.submitButton}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      </div>
    );
}

export default ManagerChatRoom;