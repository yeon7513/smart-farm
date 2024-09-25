import { useEffect, useState } from "react";
import styles from "./ChatRoom.module.scss";
import closeIcon from "../../assets/main/closeImg.svg";
import backIcon from "../../assets/main/backImg.svg";
import { useSelector } from "react-redux";
import { auth, db, getOrder } from "../../api/firebase";
import ChatRoomHeader from "./chat-room-header/ChatRoomHeader";
import ChatRoomFooter from "./chat-room-footer/ChatRoomFooter";
import ChatOptions from "./chat-options/ChatOptions";
import FaqQuestions from "./faq-questions/FaqQuestions";
import LiveChatting from "./chat-options/live-chatting/LiveChatting";
import { BeatLoader } from "react-spinners";
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

  const handleSendMessage = async (message) => {
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      console.error("사용자가 로그인되지 않았습니다.");
      return;
    }
  
    const userEmail = currentUser.email; // 로그인한 사용자 이메일 가져오기
  
    try {
      // 1. 'chatRoom' 컬렉션에서 로그인한 사용자 이메일 문서가 있는지 확인하고 없으면 생성
      const userDocRef = doc(db, "chatRoom", userEmail);
      await setDoc(userDocRef, {}, { merge: true }); // 문서가 없으면 생성, 있으면 병합
  
      // 2. 해당 이메일 문서 아래 'chatContent' 컬렉션에서 활성화된 상담이 있는지 확인
      const chatContentRef = collection(userDocRef, "chatContent");
      const q = query(chatContentRef, where("activeYn", "==", "Y")); // 활성화된 상담 찾기
      const querySnapshot = await getDocs(q);
  
      let chatRoomId;
  
      if (!querySnapshot.empty) {
        // 3. 활성화된 상담이 있으면 해당 상담 방에 메시지 추가
        const chatRoomDoc = querySnapshot.docs[0]; // 첫 번째 활성화된 상담 선택
        chatRoomId = chatRoomDoc.id;
      } else {
        // 4. 활성화된 상담이 없으면 새 상담 방 생성
        const newChatRoom = await addDoc(chatContentRef, {
          chatTheme: "상담 카테고리", // 이 필드는 필요에 따라 수정 가능
          activeYn: "Y", // 새로운 채팅 상담 시작
          chatEnd: "N", // 채팅 종료 여부
          createdAt: serverTimestamp(), // Firestore 서버 타임스탬프
        });
        chatRoomId = newChatRoom.id;
      }
  
      // 5. chatRoomId 하위 'message' 컬렉션에 메시지 추가
      const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatRoomId, "message");
      
      // Firestore에 메시지 추가 (서버 타임스탬프 사용)
      const messageDoc = await addDoc(messageRef, {
        content: message, // 메시지 내용
        createdAt: serverTimestamp(), // 메시지 전송 시간
        uid: currentUser.uid, // 사용자 고유 ID
      });
  
      // Firestore에 저장된 메시지 객체를 가져와서 임시로 로컬 메시지 배열에 추가
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messageDoc.id,
          content: message,
          createdAt: new Date(), // 임시로 현재 시간 추가
          uid: currentUser.uid, // 사용자 고유 ID
        },
      ]);
  
      console.log("메시지가 성공적으로 Firestore에 저장되었습니다.");
    } catch (error) {
      console.error("메시지 전송 중 오류 발생:", error.message); // 오류 메시지를 명확하게 출력
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
