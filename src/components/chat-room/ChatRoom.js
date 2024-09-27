import { useEffect, useState } from "react";
import styles from "./ChatRoom.module.scss";
// import closeIcon from "../../assets/main/closeImg.svg";
// import backIcon from "../../assets/main/backImg.svg";
import { useSelector } from "react-redux";
import { auth, db, getOrder } from "../../api/firebase";
import ChatRoomHeader from "./chat-room-header/ChatRoomHeader";
import ChatRoomFooter from "./chat-room-footer/ChatRoomFooter";
import ChatOptions from "./chat-options/ChatOptions";
import FaqQuestions from "./faq-questions/FaqQuestions";
import LiveChatting from "./chat-options/live-chatting/LiveChatting";
// import { BeatLoader } from "react-spinners";
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";

function ChatRoom({chatroomId}) {
  const [selectedAnswer, setSelectedAnswer] = useState(''); 
 // 질문 선택 여부 관리
  const [isStartChatSelected, setIsStartChatSelected] = useState(false); 
  // '무엇을 도와드릴까요?' 화면에서 채팅상담 시작하기 버튼 클릭했을 때 '세부 선택' 화면으로 전환 여부 관리
  const [rankedFaqData, setRankedFaqData] = useState([]); 
  // 추천수 순위가 정렬된 FAQ 데이터를 관리
 const [isLiveChatOpend, setIsLiveChatOpend] = useState(false); 
 // '세부 선택' 화면에서 '채팅상담원 연결하기' 질문 선택 여부 관리
 const [isChatRoomOpened, setIsChatRoomOpened] = useState(true);
  // 챗룸의 가시성 상태(챗룸을 닫을 수 있는{숨길 수 있는} 기능) 관리 
const [isTransitioningToLiveChat, setIsTransitioningToLiveChat] = useState(false);
const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
const [messages, setMessages] = useState([]);



  // const faqData = useSelector((state) => state.faqData);

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
    answer: "",
  };

  useEffect( () => {
    if(selectedAnswer && isLiveChatOpend) {
      // answer이 선택되면 1초 후에 live-chatting으로 전환
   setIsLoading(true);
   
      const timer = setTimeout(() => {
        setIsTransitioningToLiveChat(true);
        setIsLoading(false); // 로딩 종료
      }, 1000);

      return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [selectedAnswer]);
  
  console.log('Is transitioning to LiveChat:', isTransitioningToLiveChat); // 상태 변화 확인 로그 추가
  
  useEffect(() => {
    if (!chatroomId) return;
  
    const q = query(
      collection(db, 'chatRoom', auth.currentUser.email, 'chatroom', chatroomId, 'message'),
      orderBy('createdAt', 'asc')
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages); // 메시지 상태 업데이트
      console.log('Fetched Messages:', fetchedMessages); // 메시지 확인용 로그 추가
    });
  
    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [chatroomId]);


  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log("User is logged in:", user);
  //     } else {
  //       console.error("No user is logged in");
  //     }
  //   });
  
  //   return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  // }, []);
  

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
    setIsLiveChatOpend(false); // 추가 질문 선택 상태 초기화
    setSelectedAnswer(""); // 선택된 답변 초기화
    setIsTransitioningToLiveChat(false); // 뒤로 가기 시 전환 초기화
  };

  const handleFaqClick = (id) => {
    // 첫번째 화면에서 FAQ 버튼 클릭 시의 동작 정의 -> 클릭 시 FaqQuestions 화면으로 이동 
    if (id === "chattingCounselor") {
      // '채팅 상담사 연결하기' 질문을 선택한 경우 (올바른 ID로 수정)
      setIsLiveChatOpend(true); // 추가 질문 화면으로 전환
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


  // 메시지 전송 함수 (백업용)
  // const handleSendMessage = (message) => {
  //   const newMessage = {
  //     content: message,
  //     createdAt: new Date(),
  //     uid: 'localUser', // 임의의 사용자 ID
  //   };
  
  //   setMessages((prevMessages) => [...prevMessages, newMessage]); // 새로운 메시지를 추가하여 상태 업데이트
  // };

  const startNewChat = async (question) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("사용자가 로그인되지 않았습니다.");
      return;
    }
    
    const userEmail = currentUser.email;
    
    try {
      const chatContentRef = collection(db, "chatRoom", userEmail, "chatContent");
      const newChatRoom = await addDoc(chatContentRef, {
        chatTheme: question, // 선택된 질문 저장
        activeYn: "Y",
        chatEnd: "N",
        createdAt: serverTimestamp(),
      });
  
      const chatRoomId = newChatRoom.id;
      console.log("새로운 상담이 시작되었습니다:", chatRoomId);
  
    } catch (error) {
      console.error("상담 시작 중 오류가 발생했습니다:", error.message);
    }
  };
  
  const endChat = async (chatRoomId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error("사용자가 로그인되지 않았습니다.");
      return;
    }
  
    const userEmail = currentUser.email;
  
    try {
      const chatContentRef = doc(db, "chatRoom", userEmail, "chatContent", chatRoomId);
      await setDoc(chatContentRef, {
        activeYn: "Y",
        chatEnd: "Y",
      }, { merge: true });
  
      console.log("상담이 종료되었습니다:", chatRoomId);
    } catch (error) {
      console.error("상담 종료 중 오류가 발생했습니다:", error.message);
    }
  };

// 사용자가 선택한 옵션을 기반으로 질문을 찾는 함수
const getQuestionById = (optionId) => {
  console.log("받은 optionId:", optionId); // 전달된 optionId 확인
  const option = chatOptionsData.find((opt) => {
    console.log("비교 중인 opt.id:", opt.id); // chatOptionsData의 id와 비교 로그
    return opt.id === optionId;
  });
  
  if (option) {
    console.log("찾은 옵션:", option); // 찾은 옵션이 있는지 확인
    return option.question;
  } else {
    console.log("옵션을 찾지 못했습니다. 기본값 '기타'를 반환합니다.");
    return "기타"; // 기본적으로 "기타"로 설정
  }
};

const handleSendMessage = async (message, selectedOptionId) => {
  console.log("선택된 Option ID:", selectedOptionId); // selectedOptionId가 올바르게 전달되는지 확인

  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("사용자가 로그인되지 않았습니다.");
    return;
  }

  const userEmail = currentUser.email;
  const selectedQuestion = getQuestionById(selectedOptionId); // 선택된 질문을 찾습니다.
  
  console.log("선택된 Question:", selectedQuestion); // 선택된 질문 확인

  try {
    const userDocRef = doc(db, "chatRoom", userEmail);
    await setDoc(userDocRef, {}, { merge: true });

    const chatContentRef = collection(userDocRef, "chatContent");
    const q = query(chatContentRef, where("activeYn", "==", "Y"));
    const querySnapshot = await getDocs(q);

    let chatRoomId;

    if (!querySnapshot.empty) {
      const chatRoomDoc = querySnapshot.docs[0];
      chatRoomId = chatRoomDoc.id;
    } else {
      const newChatRoom = await addDoc(chatContentRef, {
        chatTheme: selectedQuestion, // 선택된 질문을 chatTheme으로 설정
        activeYn: "Y",
        chatEnd: "N",
        createdAt: serverTimestamp(),
      });
      chatRoomId = newChatRoom.id;
    }

    const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatRoomId, "message");

    const messageDoc = await addDoc(messageRef, {
      content: message,
      createdAt: serverTimestamp(),
      uid: currentUser.uid,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: messageDoc.id,
        content: message,
        createdAt: new Date(),
        uid: currentUser.uid,
      },
    ]);

    console.log("메시지가 성공적으로 Firestore에 저장되었습니다.");
  } catch (error) {
    console.error("메시지 전송 중 오류 발생:", error.message);
  }
};
  
   // renderContent 내에서만 상태 관리
const renderContent = () => {
if (isTransitioningToLiveChat) {
    return <LiveChatting // 1초 후 live-chatting 컴포넌트로 전환  
    messages={messages} 
    onSendMessage={handleSendMessage} 
    />; 
  }

  if (isLiveChatOpend) {
    return (
      <ChatOptions 
        chatOptionsData={chatOptionsData}
        handleOptionClick={handleOptionClick}
        selectedAnswer={selectedAnswer}
        isLoading={isLoading} 
        onSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <FaqQuestions
      rankedFaqData={rankedFaqData}
      openChat={openChat}
      handleFaqClick={handleFaqClick}
      selectedAnswer={selectedAnswer}
    />
  );
};




  return (
    <div className={styles.wrapper}>
   <ChatRoomHeader
   isLiveChatOpend={isLiveChatOpend}
  //   5번째 추가버튼(채팅상담원) 선택지 이동 
   handleBackButtonClick={handleBackButtonClick}
  //  뒤로가기 버튼
   handleClose={handleClose}
  //  닫기 버튼 
  isTransitioningToLiveChat={isTransitioningToLiveChat}
  endChat={endChat}
   />
      {/* 여기까지 헤더의 영역 */}

      <div className={styles.content}>
    {renderContent()}
      </div>

   <ChatRoomFooter
   isLiveChatOpend={isLiveChatOpend}
   isTransitioningToLiveChat={isTransitioningToLiveChat}
   onSendMessage={handleSendMessage}
   />
     {/* 풋터의 영역 */}
    </div>
  );
}

export default ChatRoom;