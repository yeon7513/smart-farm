import React from 'react'
import styles from '../ChatRoom.module.scss'

function FaqQuestions({rankedFaqData, openChat, handleFaqClick, selectedAnswer}) {
  return (
    <>
    <div className={styles.questionBtns}>
      {/* Fetch된 데이터와 로컬에서 추가한 질문을 함께 렌더링 */}
      {[...rankedFaqData, openChat].map((faq) => (
        <button
          key={faq.id}
          className={styles.questionBtn}
          onClick={() => handleFaqClick(faq.id)}
        >
          {faq.question}
        </button>
      ))}
    </div>
    {/* 질문리스트 */}
    {selectedAnswer && (
      <div className={styles.answerArea}>{selectedAnswer}</div>
    )}
    {/* 답변리스트 */}
  </>
  )
}

export default FaqQuestions