import React, { useEffect, useState } from 'react'
import styles from './ManagerChatRoom.module.scss'
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../../../../../api/firebase';
import closeIcon from "../../../../../../assets/main/closeImg.svg";
import { FaIcons } from 'react-icons/fa';
import ManagerMessage from './manager-message/ManagerMessage';



function ManagerChatRoom({ chatId, userEmail }) {
    const [isChatRoomOpened, setIsChatRoomOpened] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState(null); 
    const [message, setMessage] = useState('');

    
    useEffect(() => {
      if (!chatId || !userEmail) return;
  
      const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatId, "message");
      const unsubscribe = onSnapshot(messageRef, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(newMessages);
      });
  
      return () => unsubscribe();
    }, [chatId, userEmail]);

    const handleClose = () => {
        setIsChatRoomOpened(false);
        // 챗룸 닫기
      };

      
  // 기존 핸들러 및 전송 로직 유지
  const handleSendMessage = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatId, "message");
    await addDoc(messageRef, {
      content: message,
      createdAt: Date.now(),
      uid: currentUser.uid,
    });

    setMessage(''); // 메시지 입력 필드 초기화
  };

        // 메시지 전송 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // 메시지를 서버로 전송하거나 처리하는 로직
      console.log('전송된 메시지:', message);
      handleSendMessage(message); // 상위 컴포넌트로 메세지 전달 
      setMessage(''); // 메시지 입력 필드 초기화
    }
  };
      


  return (
    <div className={styles.wrapper}>
<div className={styles.header}>
<h2 className={styles.chattingTitle}>아이팜 채팅상담</h2>
          <button className={styles.closeBtn} onClick={() => { handleClose();}}>
            <img
              src={closeIcon}
              alt="닫기"
              style={{ width: "16px", height: "16px" }}
            />
          </button>
</div>
    {/* 여기까지 헤더의 영역 */}


    <div className={styles.content}><ManagerMessage/></div>

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
      <FaIcons.FaPaperPlane />
      </button>
    </form>
</div>
    {/* 풋터의 영역 */}
  </div>
  )
}

export default ManagerChatRoom;
