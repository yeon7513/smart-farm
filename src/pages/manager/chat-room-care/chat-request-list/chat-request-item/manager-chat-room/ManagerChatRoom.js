import React, { useState } from 'react'
import styles from './ManagerChatRoom.module.scss'
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../../../../../api/firebase';
import closeIcon from "../../../../../../assets/main/closeImg.svg";
import { FaIcons } from 'react-icons/fa';
import ManagerMessage from './manager-message/ManagerMessage';



function ManagerChatRoom() {
    const [isChatRoomOpened, setIsChatRoomOpened] = useState(true);
    const [messages, setMessages] = useState([]);
    const [chatRoomId, setChatRoomId] = useState(null); 
    const [message, setMessage] = useState('');

    


    const handleClose = () => {
        setIsChatRoomOpened(false);
        // 챗룸 닫기
      };

      const handleSendMessage = async (message) => {
        const currentUser = auth.currentUser;
      
        if (!currentUser || !chatRoomId) {
          console.error("사용자가 로그인되지 않았거나 chatRoomId가 없습니다.");
          return;
        }
      
        const userEmail = currentUser.email;
      
        try {
          const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatRoomId, "message");
      
          const messageDoc = await addDoc(messageRef, {
            content: message,
            createdAt: Date.now(), // 밀리세컨즈 단위로 시간을 저장
            uid: currentUser.uid,
          });
      
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: messageDoc.id,
              content: message,
              createdAt: Date.now(), // 밀리세컨즈 단위로 시간을 추가
              uid: currentUser.uid,
            },
          ]);
      
          console.log("메시지가 성공적으로 Firestore에 저장되었습니다.");
        } catch (error) {
          console.error("메시지 전송 중 오류 발생:", error.message);
        }
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
