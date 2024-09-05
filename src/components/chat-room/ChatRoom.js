import { useState } from 'react';
import styles from './ChatRoom.module.scss'



function ChatRoom({handleClose}) {
    const [selectedAnswer, setSelectedAnswer] = useState('');

    const answers = {
      answer1 : '스마트팜(Smart Farm)은 정보통신기술(ICT)을 활용해 농작물 재배와 가축 사육을 자동화하고 최적화하는 농업 시스템입니다. 센서와 IoT 기술로 온도, 습도, 일조량 등 환경 데이터를 실시간으로 수집하고, 이를 기반으로 자동으로 환경을 조절합니다. 스마트폰이나 컴퓨터로 원격 제어와 모니터링이 가능하여 노동력 절감, 생산성 향상, 품질 관리에 도움이 됩니다.',
      answer2 : '답변 2: 여기에 두 번째 질문에 대한 답변이 나옵니다.',
      answer3 : '답변 3: 여기에 세 번째 질문에 대한 답변이 나옵니다.',
      answer4 : '답변 4: 여기에 네 번째 질문에 대한 답변이 나옵니다.',
      answer5 : '답변 5: 여기에 다섯 번째 질문에 대한 답변이 나옵니다.',
    }

    const showAnswer = (answerKey) => {
        setSelectedAnswer(answers[answerKey]);
      };
      

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                <h2>아이팜 채팅상담</h2>
      <button onClick={handleClose}><img src='./img/closeIcon.svg' alt="닫기" style={{width:'16px', height:'16px'}} /></button>
      <p>무엇을 도와드릴까요?</p>
                </div>
                <div className={styles.questionButtons}>
    <button onClick={() => showAnswer('answer1')}>스마트팜이 뭔가요?</button>
    <button onClick={() => showAnswer('answer2')}>견적의뢰요청방법</button>
    <button onClick={() => showAnswer('answer3')}>A/S 문의하기</button>
    <button onClick={() => showAnswer('answer4')}>대쉬보드 사용법</button>
    <button onClick={() => showAnswer('answer5')}>채팅 상담원 연결하기</button>
<div className={styles.answerArea}>
  {selectedAnswer}
  </div> 
   </div>
   <div className={styles.footer}> 채팅 상담원 연결 시간은 오전 9시부터 오후 6시까지 운영되오니 많은 참고 부탁드립니다.😊 </div>
            </div>
        </div>
    );
}

export default ChatRoom;