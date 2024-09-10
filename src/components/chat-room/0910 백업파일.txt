import { useEffect, useState } from 'react';
import styles from './ChatRoom.module.scss';
import closeIcon from '../../assets/main/closeImg.svg';
import backIcon from '../../assets/main/backImg.svg';
import { useSelector } from 'react-redux';
import { getOrder } from '../../api/firebase';

function ChatRoom({ handleClose }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isChatOptionsSelected, setisChatOptionsSelected] = useState(false);
  const [sortedFaqData, setSortedFaqData] = useState([]); // 상태로 정렬된 FAQ 데이터를 관리
  // Redux 상태에서 FAQ 데이터 가져오기
 
  const faqData = useSelector((state) => state.faqData);

  // FAQ 데이터를 Firestore에서 'likes' 필드를 기준으로 내림차순 정렬해서 가져오기
useEffect(() => {
  const fetchSortedFaqData = async () => {
   try {
      const sortedData = await getOrder('faq', 'likes'); // 'likes' 필드를 기준으로 FAQ 데이터를 가져옴
      console.log("Fetched FAQ Data: ", sortedData); // 가져온 데이터를 콘솔에 출력
      setSortedFaqData(sortedData); // 정렬된 데이터를 상태에 설정합니다.
    } catch (error) {
      console.error('Error fetching sorted FAQs:', error);
    }
  };
  fetchSortedFaqData(); // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
}, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다. 


  const answers = {
    answer1: '스마트팜(Smart Farm)은 정보통신기술(ICT)을 활용해 농작물 재배와 가축 사육을 자동화하고 최적화하는 농업 시스템입니다. 센서와 IoT 기술로 온도, 습도, 일조량 등 환경 데이터를 실시간으로 수집하고, 이를 기반으로 자동으로 환경을 조절합니다. 스마트폰이나 컴퓨터로 원격 제어와 모니터링이 가능하여 노동력 절감, 생산성 향상, 품질 관리에 도움이 됩니다.',
    answer2: '답변 2: 여기에 두 번째 질문에 대한 답변이 나옵니다.',
    answer3: '답변 3: 여기에 세 번째 질문에 대한 답변이 나옵니다.',
    answer4: '답변 4: 여기에 네 번째 질문에 대한 답변이 나옵니다.',
  };

  const showAnswer = (answerKey) => {
    setSelectedAnswer(answers[answerKey]);
  };

  const handleChatButtonClick = () => {
    setisChatOptionsSelected(true); // "채팅 상담원 연결하기" 버튼 클릭 시 선택지 화면으로 전환
  };

  const handleBackButtonClick = () => {
    setisChatOptionsSelected(false); // "뒤로 가기" 버튼 클릭 시 이전 화면으로 전환
  };

  const handleFaqClick = (id) => {
    // FAQ 버튼 클릭 시의 동작 정의
    // console.log('FAQ 선택됨:', id);
  const selectedFaq = sortedFaqData.find((faq) => faq.id === id); // 클릭된 FAQ를 찾음
  
  if (selectedFaq && selectedFaq.answer) { // FAQ와 answer 필드가 존재하는지 확인
    setSelectedAnswer(selectedFaq.answer); // 해당 FAQ의 답변을 설정 
  } else {
    console.warn('선택한 FAQ에 답변이 없습니다:', selectedFaq);
  }
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.header} ${isChatOptionsSelected ? styles.headerDetailOption : ''}`}>
        {isChatOptionsSelected ? (
          <>
            <button className={styles.backBtn} onClick={handleBackButtonClick}>
              <img src={backIcon} alt='뒤로 가기' style={{ width: '16px', height: '16px' }} />
            </button>
            <h2 className={styles.chatDetailTitle}>세부 선택</h2>
            <button className={styles.closeBtn} onClick={handleClose}>
              <img src={closeIcon} alt='닫기' style={{ width: '16px', height: '16px' }} />
            </button>
           
          </>
        ) : (
          <>
            <h2 className={styles.title}>아이팜 채팅상담</h2>
            <button className={styles.closeBtn} onClick={handleClose}>
              <img src={closeIcon} alt='닫기' style={{ width: '16px', height: '16px' }} />
            </button>
            <p className={styles.guideText}>무엇을 도와드릴까요?</p>
          </>
        )}
      </div>
      {/* 여기까지 헤더의 영역 */}

      <div className={styles.content}>
        {isChatOptionsSelected ? (
          <div className={styles.chatOptions}>
            {sortedFaqData.map ((faq) => (
              <button 
              key={faq.id} 
              className={styles.questionBtn} 
              onClick={() => handleFaqClick(faq.id)}
              >
                {faq.question}
              </button>
            ))}
            {selectedAnswer && <div className={styles.answerArea}>{selectedAnswer}</div> } 
          </div>
        ) : (
          <>
            <div className={styles.questionBtns}>
              <button className={styles.questionBtn} onClick={() => showAnswer('answer1')}>
                회원 정보 관련 문의 
              </button>
              <button className={styles.questionBtn} onClick={() => showAnswer('answer2')}>
                견적의뢰요청방법
              </button>
              <button className={styles.questionBtn} onClick={() => showAnswer('answer3')}>
                기기 관련 문의 
              </button>
              <button className={styles.questionBtn} onClick={() => showAnswer('answer4')}>
                기타 상담 
              </button>
              <button className={styles.questionBtn} onClick={handleChatButtonClick}>
                채팅 상담원 연결하기
              </button>
            </div>
            {/* 질문리스트 */}
            {selectedAnswer && <div className={styles.answerArea}>{selectedAnswer}</div>}
            {/* 답변리스트 */}
          </>
        )}
      </div>
      <div className={styles.footer}>
        채팅 상담원 연결 시간은 오전 9시부터 오후 6시까지 운영되오니 많은 참고 부탁드립니다.😊
      </div>
      {/* 풋터의 영역 */}
    </div>
  );
}

export default ChatRoom;
