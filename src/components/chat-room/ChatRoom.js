import { useEffect, useState } from "react";
import styles from "./ChatRoom.module.scss";
import closeIcon from "../../assets/main/closeImg.svg";
import backIcon from "../../assets/main/backImg.svg";
import { useSelector } from "react-redux";
import { getOrder } from "../../api/firebase";
import ChatRoomHeader from "./chat-room-header/ChatRoomHeader";
import ChatRoomFooter from "./chat-room-footer/ChatRoomFooter";
import ChatOptions from "./chat-options/ChatOptions";
import FaqQuestions from "./faq-questions/FaqQuestions";

function ChatRoom() {
  const [selectedAnswer, setSelectedAnswer] = useState(''); 
 // 질문 선택 여부 관리
  const [isChatOptionsSelected, setisChatOptionsSelected] = useState(false); 
  // 화면 전환 여부 관리
  const [sortedFaqData, setSortedFaqData] = useState([]); 
  // 상태로 정렬된 FAQ 데이터를 관리
 const [isExtraQuestionSelected, setIsExtraQuestionSelected] = useState(false); 
 // 다섯 번째 질문 선택 여부 관리
 const [isChatRoomVisible, setIsChatRoomVisible] = useState(true);
  // 챗룸의 가시성 상태



  const faqData = useSelector((state) => state.faqData);

  // FAQ 데이터를 Firestore에서 'likes' 필드를 기준으로 내림차순 정렬해서 가져오기
  useEffect(() => {
    const fetchSortedFaqData = async () => {
      try {
        const sortedData = await getOrder("faq", "likes"); // 'likes' 필드를 기준으로 FAQ 데이터를 가져옴
        console.log("Fetched FAQ Data: ", sortedData); // 가져온 데이터를 콘솔에 출력
        setSortedFaqData(sortedData); // 정렬된 데이터를 상태에 설정
      } catch (error) {
        console.error("Error fetching sorted FAQs:", error);
      }
    };
    fetchSortedFaqData(); // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  //  추가할 5번째 질문과 답변
  const extraQuestion = {
    id: "extral", // 고유 ID 생성
    question: " 채팅 상담원 연결하기",
    answer: "이것은 파일 내부에서 추가된 다섯 번째 질문에 대한 답변입니다.",
  };

  //  chatOptionsData 화면에서 사용할 추가 질문과 답변
  const chatOptionsData = [
    { id: "option1", question: "회원 정보", answerKey: "answer1" },
    { id: "option2", question: "결제/환불", answerKey: "answer2" },
    { id: "option3", question: "출장 서비스", answerKey: "answer3" },
    { id: "option4", question: "견적서", answerKey: "answer4" },
    { id: "option5", question: "스마트팜 시스템", answerKey: "answer5" },
    { id: "option6", question: "A/S", answerKey: "answer5" },
    { id: "option7", question: "기타", answerKey: "answer7" },
  ];

  const answers = {
    answer1:
      "요청하신 회원 정보 상담을 위해 채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...",
    answer2:
      "요청하신 결제/환불 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...",
    answer3:
      "요청하신 출장 서비스 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...",
    answer4:
      "요청하신 견적서 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...",
    answer5:
      "요청하신 A/S 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...",
    answer7:
      "요청하신 기타 사항 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...",
  };

  const showAnswer = (answerKey) => {
    setSelectedAnswer(answers[answerKey]);
  };

  const handleChatButtonClick = (id) => {
    setisChatOptionsSelected(true); // "채팅 상담원 연결하기" 버튼 클릭 시 선택지 화면으로 전환
    setSelectedAnswer(""); // 선택된 답변 초기화
  };

  const handleBackButtonClick = () => {
    setisChatOptionsSelected(false); // "뒤로 가기" 버튼 클릭 시 이전 화면으로 전환
    setIsExtraQuestionSelected(false); // 추가 질문 선택 상태 초기화
    setSelectedAnswer(""); // 선택된 답변 초기화
  };

  const handleFaqClick = (id) => {
    // FAQ 버튼 클릭 시의 동작 정의
    if (id === "extral") {
      // 다섯 번째 질문을 선택한 경우 (올바른 ID로 수정)
      setIsExtraQuestionSelected(true); // 추가 질문 화면으로 전환
      setisChatOptionsSelected(true);
      setSelectedAnswer("");
    } else {
      const selectedFaq = [...sortedFaqData, extraQuestion].find(
        (faq) => faq.id === id
      ); // 클릭된 FAQ를 찾음

      if (selectedFaq && selectedFaq.answer) {
        // FAQ와 answer 필드가 존재하는지 확인
        setSelectedAnswer(selectedFaq.answer); // 해당 FAQ의 답변을 설정
      } else {
        console.warn("선택한 FAQ에 답변이 없습니다:", selectedFaq);
      }
    }
  };

  const handleOptionClick = (id) => {
    const selectedOption = chatOptionsData.find((option) => option.id === id); // 클릭된 추가 질문 찾기

    if (selectedOption) {
      // showAnswer 함수에 answerKey를 전달
      showAnswer(selectedOption.answerKey);
    } else {
      console.warn("선택한 옵션에 답변이 없습니다.", selectedOption);
    }
  };

  const handleClose = () => {
    setIsChatRoomVisible(false); // 챗룸 닫기
  };

  if (!isChatRoomVisible) return null; // 챗룸이 보이지 않도록 설정

  return (
    <div className={styles.wrapper}>
   <ChatRoomHeader
   isExtraQuestionSelected={isExtraQuestionSelected}
   handleBackButtonClick={handleBackButtonClick}
   handleClose={handleClose}
   />
      {/* 여기까지 헤더의 영역 */}

      <div className={styles.content}>
        {isExtraQuestionSelected ? (
        <ChatOptions 
        chatOptionsData={chatOptionsData}
        handleOptionClick={handleOptionClick}
        selectedAnswer={selectedAnswer}
        />
        ) : (
    <FaqQuestions
    sortedFaqData={sortedFaqData}
    extraQuestion={extraQuestion}
    handleFaqClick={handleFaqClick}
    selectedAnswer={selectedAnswer}
      />
    
        )}
      </div>

   <ChatRoomFooter
   isExtraQuestionSelected={isExtraQuestionSelected}
   />
     {/* 풋터의 영역 */}
    </div>
  );
}

export default ChatRoom;
