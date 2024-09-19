import React, { useEffect, useState } from 'react'
import styles from '../ChatRoom.module.scss'
import LiveChatting from './live-chatting/LiveChatting';
import {BeatLoader} from 'react-spinners'


function ChatOptions({chatOptionsData, handleOptionClick, selectedAnswer, isLoading}) {

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
      <BeatLoader color="#8adab7" />
      </div>
    )}</>
    )}
  </>
  )
}

export default ChatOptions