import { useEffect, useState } from 'react';
import styles from './ChatRoom.module.scss';
// import closeIcon from "../../assets/main/closeImg.svg";
// import backIcon from "../../assets/main/backImg.svg";
import { auth, db, getOrder } from '../../api/firebase';
import ChatOptions from './chat-options/ChatOptions';
import LiveChatting from './chat-options/live-chatting/LiveChatting';
import ChatRoomFooter from './chat-room-footer/ChatRoomFooter';
import ChatRoomHeader from './chat-room-header/ChatRoomHeader';
import FaqQuestions from './faq-questions/FaqQuestions';
// import { BeatLoader } from "react-spinners";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';

function ChatRoom({ chatroomId }) {
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
  const [isTransitioningToLiveChat, setIsTransitioningToLiveChat] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [messages, setMessages] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null); 

  // const faqData = useSelector((state) => state.faqData);

  // FAQ 데이터를 Firestore에서 'likes' 필드를 기준으로 내림차순 정렬해서 가져오기
  useEffect(() => {
    const fetchRankedFaqData = async () => {
      try {
        const rankedData = await getOrder('faq', 'likes');
        // 'likes' 필드를 기준으로 FAQ 데이터를 가져옴
        console.log('Fetched FAQ Data: ', rankedData);
        // 가져온 데이터를 콘솔에 출력
        setRankedFaqData(rankedData);
        // 정렬된 데이터를 상태에 설정
      } catch (error) {
        console.error('Error fetching ranked FAQs:', error);
      }
    };
    fetchRankedFaqData();
    // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []);
  // 의존성 배열을 빈 배열로 설정하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정

  //  추가할 5번째 질문과 답변
  const openChat = {
    id: 'chattingCounselor', // 고유 ID 생성
    question: ' 채팅 상담 시작하기',
    answer: '',
  };

  useEffect(() => {
    if (!chatroomId) return;
    
    // Firestore에서 activeYn 상태를 실시간으로 감시
    const chatRoomRef = doc(
      db,
      'chatRoom',
      auth.currentUser.email,
      'chatContent',
      chatroomId
    );
    
    const unsubscribe = onSnapshot(chatRoomRef, (doc) => {
      const chatRoomData = doc.data();
    
      if (chatRoomData?.activeYn === 'Y') {
        // activeYn이 "Y"로 변경되면
        setIsLoading(false); // 로딩 종료
        setIsTransitioningToLiveChat(true); // LiveChatting 화면으로 전환
      }
    });
    
    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, [chatroomId]);

  console.log('Is transitioning to LiveChat:', isTransitioningToLiveChat); // 상태 변화 확인 로그 추가

  useEffect(() => {
    if (!chatroomId) return;

    const q = query(
      collection(
        db,
        'chatRoom',
        auth.currentUser.email,
        'chatroom',
        chatroomId,
        'message'
      ),
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
    {
      id: 'option1',
      question: '회원 정보',
      answer:
        '요청하신 회원 정보 상담을 위해 채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
    {
      id: 'option2',
      question: '결제/환불',
      answer:
        '요청하신 결제/환불 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
    {
      id: 'option3',
      question: '출장 서비스',
      answer:
        '요청하신 출장 서비스 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
    {
      id: 'option4',
      question: '견적서',
      answer:
        '요청하신 견적서 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
    {
      id: 'option5',
      question: '스마트팜 시스템',
      answer:
        '요청하신 스마트팜 시스템 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
    {
      id: 'option6',
      question: 'A/S',
      answer:
        '요청하신 A/S 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
    {
      id: 'option7',
      question: '기타',
      answer:
        '요청하신 기타 사항 상담을 위해  채팅 상담원과 연결 중입니다. 잠시만 기다려 주세요...',
    },
  ];

  const handleChatButtonClick = (id) => {
    setIsStartChatSelected(true);
    // 첫번째 화면에서 "채팅 상담원 연결하기" 버튼 클릭 시 선택지 화면으로 전환
    setSelectedAnswer(''); // 선택된 답변 초기화
  };

  const handleBackButtonClick = () => {
    setIsStartChatSelected(false); // "뒤로 가기" 버튼 클릭 시 이전 화면으로 전환
    setIsLiveChatOpend(false); // 추가 질문 선택 상태 초기화
    setSelectedAnswer(''); // 선택된 답변 초기화
    setIsTransitioningToLiveChat(false); // 뒤로 가기 시 전환 초기화
  };

  const handleFaqClick = (id) => {
    // 첫번째 화면에서 FAQ 버튼 클릭 시의 동작 정의 -> 클릭 시 FaqQuestions 화면으로 이동
    if (id === 'chattingCounselor') {
      // '채팅 상담사 연결하기' 질문을 선택한 경우 (올바른 ID로 수정)
      setIsLiveChatOpend(true); // 추가 질문 화면으로 전환
      setIsStartChatSelected(true);
      setSelectedAnswer('');
    } else {
      const selectedFaq = [...rankedFaqData, openChat].find(
        (faq) => faq.id === id
      ); // 클릭된 FAQ를 찾음

      if (selectedFaq && selectedFaq.answer) {
        // FAQ와 answer 필드가 존재하는지 확인
        setSelectedAnswer(selectedFaq.answer); // 해당 FAQ의 답변을 설정
      } else {
        console.warn('선택한 FAQ에 답변이 없습니다:', selectedFaq);
      }
    }
  };

  const fetchUserNickname = async () => {
    const currentUser = auth.currentUser;
  
    if (!currentUser) {
      console.error("사용자가 로그인되지 않았습니다.");
      return null;
    }
  
    const userEmail = currentUser.email;
  
    try {
      const userDocRef = doc(db, "users", currentUser.uid);  // 유저의 이메일을 문서 ID로 사용
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const nickname = userDoc.data().nickname;  // nickname 필드 가져오기
        return nickname;
      } else {
        console.error("유저 문서를 찾을 수 없습니다.");
        return null;
      }
    } catch (error) {
      console.error("닉네임을 가져오는 중 오류 발생:", error.message);
      return null;
    }
  };
  

  const startNewChat = async (question) => {
    const currentUser = auth.currentUser;
    // 현재 로그인된 사용자 정보를 가져옴 (Firebase 인증 사용)
  
    if (!currentUser) {
      // 사용자가 로그인되어 있지 않은 경우
      console.error("사용자가 로그인되지 않았습니다.");
      // 에러 메시지를 콘솔에 출력
      return;
      // 함수 종료
    }
  
    const userEmail = currentUser.email;
    // 사용자의 이메일 정보를 추출하여 Firebase의 경로로 사용
    const userNickname = await fetchUserNickname(userEmail); 
    // Firestore에서 닉네임 가져오기
  
    try {
      const chatContentRef = collection(db, "chatRoom", userEmail, "chatContent");
      // Firestore의 chatRoom → 사용자 이메일 → chatContent 컬렉션에 접근하여 새 문서를 추가할 준비
  
      const newChatRoom = await addDoc(chatContentRef, {
        // Firestore에 새 문서를 추가, 필드는 아래와 같음
        chatTheme: question,  // 질문(상담 주제)을 chatTheme에 저장
        nickname: userNickname,  // 닉네임을 Firestore에 저장
        activeYn: "N",  // 새로 생성된 상담 요청은 "N"(비활성화)으로 설정
        chatEnd: "N",  // 상담이 종료되지 않았음을 표시
        createdAt: serverTimestamp(),  // 서버 타임스탬프를 생성 시간으로 사용
      });
  
      const chatRoomId = newChatRoom.id;
      // 새로 생성된 상담방 ID를 chatRoomId 변수에 저장
      setChatRoomId(chatRoomId);
      // chatRoomId 상태 업데이트
      console.log("새로운 상담이 시작되었습니다:", chatRoomId);
      // 콘솔에 상담 시작 메시지와 함께 chatRoomId 출력
    } catch (error) {
      // 오류 발생 시
      console.error("상담 시작 중 오류가 발생했습니다:", error.message);
      // 콘솔에 오류 메시지 출력
    }
  };

  const handleOptionClick = async (id) => {
    // 두번째 화면에서 카테고리 버튼 클릭시 답변 연결 후 세번째 채팅방으로 연결
    const selectedOption = chatOptionsData.find((option) => option.id === id);
    if (selectedOption) {
      // showAnswer 함수에 answer을 전달
      setSelectedAnswer(selectedOption.answer);  // 선택된 질문에 대한 답변 설정
      setIsLoading(true); // Firestore에서 activeYn이 "Y"로 바뀔 때까지 로딩 상태 유지
      await startNewChat(selectedOption.question);  // 새로운 채팅 시작 (Firestore에 저장)
      setIsLiveChatOpend(true);  // 채팅 화면으로 전환
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

  
  const endChat = async (chatRoomId) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      console.error('사용자가 로그인되지 않았습니다.');
      return;
    }
  
    const userEmail = currentUser.email;
    try {
      const chatContentRef = doc(db, 'chatRoom', userEmail, 'chatContent', chatRoomId);
      await setDoc(
        chatContentRef,
        {
          activeYn: 'Y',
          chatEnd: 'Y',  // 상담 종료 처리
        },
        { merge: true }
      );
      console.log('상담이 종료되었습니다:', chatRoomId);
    } catch (error) {
      console.error('상담 종료 중 오류가 발생했습니다:', error.message);
    }
  };

  // // 사용자가 선택한 옵션을 기반으로 질문을 찾는 함수
  // const getQuestionById = (optionId) => {
  //   console.log('받은 optionId:', optionId); // 전달된 optionId 확인
  //   const option = chatOptionsData.find((opt) => {
  //     console.log('비교 중인 opt.id:', opt.id); // chatOptionsData의 id와 비교 로그
  //     return opt.id === optionId;
  //   });

  //   if (option) {
  //     console.log('찾은 옵션:', option); // 찾은 옵션이 있는지 확인
  //     return option.question;
  //   } else {
  //     console.log("옵션을 찾지 못했습니다. 기본값 '기타'를 반환합니다.");
  //     return '기타'; // 기본적으로 "기타"로 설정
  //   }
  // };

  const handleSendMessage = async (message) => {
    // 메시지 파라미터를 받아서 처리하는 함수
  
    const currentUser = auth.currentUser;
    // 현재 로그인된 사용자 정보 가져옴 (Firebase 인증 사용)
  
    if (!currentUser || !chatRoomId) {
      // 사용자가 로그인되어 있지 않거나 chatRoomId가 없는 경우 에러 출력
      console.error("사용자가 로그인되지 않았거나 chatRoomId가 없습니다.");
      return;
    }
  
    const userEmail = currentUser.email;
    // 유저의 이메일 정보를 추출하여 Firebase의 컬렉션 경로로 사용
  
    try {
      const messageRef = collection(db, "chatRoom", userEmail, "chatContent", chatRoomId, "message");
      // Firestore에서 chatRoom → 유저 이메일 → chatContent → chatRoomId → message 경로로 메시지 저장
  
      const messageDoc = await addDoc(messageRef, {
        // Firestore에 메시지 문서를 content, createdAt, uid 필드와 함께 추가
        content: message,
        createdAt: serverTimestamp(),
        uid: currentUser.uid,
      });
  
      setMessages((prevMessages) => [
        // 로컬 상태에 새로 보낸 메시지를 추가
        ...prevMessages,
        {
          id: messageDoc.id, // Firestore에서 생성된 메시지 ID
          content: message,  // 전송한 메시지 내용
          createdAt: new Date(), // 현재 시간 (서버 타임스탬프와 동기화 필요)
          uid: currentUser.uid,  // 유저 고유 ID
        },
      ]);
  
      console.log("메시지가 성공적으로 Firestore에 저장되었습니다.");
    } catch (error) {
      // 메시지 전송 중 오류가 발생할 경우 오류 메시지 출력
      console.error("메시지 전송 중 오류 발생:", error.message);
    }
  };

  // renderContent 내에서만 상태 관리
  const renderContent = () => {
    if (isTransitioningToLiveChat) {
      return (
        <LiveChatting // 1초 후 live-chatting 컴포넌트로 전환
          messages={messages}
          onSendMessage={handleSendMessage}
        />
      );
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

      <div className={styles.content}>{renderContent()}</div>

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