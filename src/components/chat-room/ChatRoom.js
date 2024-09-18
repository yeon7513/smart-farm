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
  const [isStartChatSelected, setIsStartChatSelected] = useState(false); 
  // '무엇을 도와드릴까요?' 화면에서 채팅상담 시작하기 버튼 클릭했을 때 '세부 선택' 화면으로 전환 여부 관리
  const [rankedFaqData, setRankedFaqData] = useState([]); 
  // 추천수 순위가 정렬된 FAQ 데이터를 관리
 const [openChatLived, setOpenChatLived] = useState(false); 
 // '세부 선택' 화면에서 '채팅상담원 연결하기' 질문 선택 여부 관리
 const [isChatRoomOpened, setIsChatRoomOpened] = useState(true);
  // 챗룸의 가시성 상태(챗룸을 닫을 수 있는{숨길 수 있는} 기능) 관리 
  const [isLiveChattingOpened, setIsLiveChattingOpened] = useState(false);
// LiveChatting 접속을 위한 새로운 상태 -> 아직 미완성 상태임



  const faqData = useSelector((state) => state.faqData);

  // FAQ 데이터를 Firestore에서 'likes' 필드를 기준으로 내림차순 정렬해서 가져오기
  useEffect(() => {
    const fetchRankedFaqData = async () => {
      try {
        const rankedData = await getOrder("faq", "likes"); 
        // 'likes' 필드를 기준으로 FAQ 데이터를 가져옴
        console.log("Fetched FAQ Data: ", rankedData); 
        // 가져온 데이터를 콘솔에 출력
        setRankedFaqData(rankedData); 
        // 정렬된 데이터를 상태에 설정
      } catch (error) {
        console.error("Error fetching ranked FAQs:", error);
      }
    };
    fetchRankedFaqData(); 
    // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []); 
  // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  //  추가할 5번째 질문과 답변
  const openChat = {
    id: "chattingCounselor", // 고유 ID 생성
    question: " 채팅 상담 시작하기",
    answer: "이것은 파일 내부에서 추가된 다섯 번째 질문에 대한 답변입니다.",
  };

  //  chatOptionsData 화면에서 사용할 추가 질문과 답변
  const chatOptionsData = [
    { id: "option1", question: "회원 정보", answer: "요청하신 회원 정보 상담을 위해 채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
    { id: "option2", question: "결제/환불", answer: "요청하신 결제/환불 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
    { id: "option3", question: "출장 서비스", answer: "요청하신 출장 서비스 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
    { id: "option4", question: "견적서", answer: "요청하신 견적서 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
    { id: "option5", question: "스마트팜 시스템", answer: "요청하신 스마트팜 시스템 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
    { id: "option6", question: "A/S", answer: "요청하신 A/S 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
    { id: "option7", question: "기타", answer: "요청하신 기타 사항 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요..." },
  ];

  const handleChatButtonClick = (id) => {
    setIsStartChatSelected(true); 
    // 첫번째 화면에서 "채팅 상담원 연결하기" 버튼 클릭 시 선택지 화면으로 전환
    setSelectedAnswer(""); // 선택된 답변 초기화
  };

  const handleBackButtonClick = () => {
    setIsStartChatSelected(false); // "뒤로 가기" 버튼 클릭 시 이전 화면으로 전환
    setOpenChatLived(false); // 추가 질문 선택 상태 초기화
    setSelectedAnswer(""); // 선택된 답변 초기화
  };

  const handleFaqClick = (id) => {
    // 첫번째 화면에서 FAQ 버튼 클릭 시의 동작 정의 -> 클릭 시 FaqQuestions 화면으로 이동 
    if (id === "chattingCounselor") {
      // '채팅 상담사 연결하기' 질문을 선택한 경우 (올바른 ID로 수정)
      setOpenChatLived(true); // 추가 질문 화면으로 전환
      setIsStartChatSelected(true);
      setSelectedAnswer("");
    } else {
      const selectedFaq = [...rankedFaqData, openChat].find(
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
    // 두번째 화면에서 카테고리 버튼 클릭시 답변 연결 후 세번째 채팅방으로 연결 
    const selectedOption = chatOptionsData.find((option) => option.id === id);
     // 클릭된 추가 질문 찾기

    if (selectedOption) {
      // showAnswer 함수에 answer을 전달
      setSelectedAnswer(selectedOption.answer);
    } else {
      console.warn("선택한 옵션에 답변이 없습니다.", selectedOption);
    }
  };

  const handleClose = () => {
    setIsChatRoomOpened(false); 
    // 챗룸 닫기
  };

  if (!isChatRoomOpened) return null;
   // 챗룸이 보이지 않도록 설정

   const renderContent = () => {
    switch (true) {
      case openChatLived:
        return (
          <ChatOptions 
            chatOptionsData={chatOptionsData}
            handleOptionClick={handleOptionClick}
            selectedAnswer={selectedAnswer}
          />
        );
      default:
        return (
          <FaqQuestions
            rankedFaqData={rankedFaqData}
            openChat={openChat}
            handleFaqClick={handleFaqClick}
            selectedAnswer={selectedAnswer}
          />
        );
    }
  };



  return (
    <div className={styles.wrapper}>
   <ChatRoomHeader
   openChatLived={openChatLived}
  //   5번째 추가버튼(채팅상담원) 선택지 이동 
   handleBackButtonClick={handleBackButtonClick}
  //  뒤로가기 버튼
   handleClose={handleClose}
  //  닫기 버튼 
   />
      {/* 여기까지 헤더의 영역 */}

      <div className={styles.content}>
    {renderContent()}
      </div>

   <ChatRoomFooter
   openChatLived={openChatLived}
   />
     {/* 풋터의 영역 */}
    </div>
  );
}

export default ChatRoom;
