import React, { useEffect, useState } from 'react'
import styles from '../ChatRoom.module.scss'
import LiveChatting from './live-chatting/LiveChatting';
import {BeatLoader} from 'react-spinners'


function ChatOptions({chatOptionsData, handleOptionClick, selectedAnswer}) {
  const [isTransitioningToLiveChat, setIsTransitioningToLiveChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  
useEffect( () => {
  if(selectedAnswer) {
    // answer이 선택되면 8초 후에 live-chatting으로 전환
 setIsLoading(true);
 
    const timer = setTimeout(() => setIsTransitioningToLiveChat(true), 8000);
    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }
}, [selectedAnswer]);

console.log('Is transitioning to LiveChat:', isTransitioningToLiveChat); // 상태 변화 확인 로그 추가

if (isTransitioningToLiveChat) {
  return <LiveChatting />; // 5초 후 live-chatting 컴포넌트로 전환 
}

  return (
    <>
     <div className={styles.chatOptions}>
      {/* 추가 질문 화면 */}
      {chatOptionsData.map((option) => (
        <button
          key={option.id}
          className={styles.questionBtn}
          onClick={() => handleOptionClick(option.id)}
        >
          {option.question}
        </button>
      ))}
    </div>

   {selectedAnswer && ( 
    <>     <div className={styles.answerArea}>{selectedAnswer}</div>
    {isLoading && (
      <div className={styles.loadingContainer}>
      <BeatLoader color="#36d7b7" />
      </div>
    )}</>
    )}
  </>
  )
}

export default ChatOptions