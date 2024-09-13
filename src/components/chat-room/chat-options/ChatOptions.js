import React from 'react'
import styles from '../ChatRoom.module.scss'

function ChatOptions({chatOptionsData, handleOptionClick, selectedAnswer}) {
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
      <div className={styles.answerArea}>{selectedAnswer}</div>
    )}
  </>
  )
}

export default ChatOptions