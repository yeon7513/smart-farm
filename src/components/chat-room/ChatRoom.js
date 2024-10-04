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
  onSnapshot,
  orderBy,
  query,
  setDoc,
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
    if (!chatRoomId) return;
  
    const chatRoomRef = doc(db, 'chatRoom', auth.currentUser.email, 'chatContent', chatRoomId);
  
    const unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
      if (doc.exists()) {
        const chatRoomData = doc.data();
        if (chatRoomData.activeYn === 'Y') {
          setIsTransitioningToLiveChat(true); // activeYn이 Y로 변경되면 전환 상태 설정
          setIsLiveChatOpend(true);  // live chat 화면 열기
        }
      }
    });
  
    return () => {
      unsubscribeChatRoom(); // 채팅방 상태 구독 해제
    };
  }, [chatRoomId]);

  
  useEffect(() => {
    if (!chatRoomId) return;

    const messageRef = collection(
      db,
      'chatRoom',
       auth.currentUser.email,
        'chatContent',
         chatRoomId,
          'message'
        );

    const q = query(
      messageRef,
       orderBy(
      'createdAt',
       'asc'
      ));
  
    const chatRoomRef = doc(db,
       'chatRoom',
        auth.currentUser.email,
         'chatContent',
          chatRoomId
        );
  
    const unsubscribeMessages = onSnapshot(q, (snapshot) => {
      const fetchedMessages = [];
      snapshot.forEach((doc) => {
        fetchedMessages.push({ id: doc.id, ...doc.data() });
      });

      setMessages(fetchedMessages);
    });

    const unsubscribeChatRoom = onSnapshot(chatRoomRef, (doc) => {
      if (doc.exists()) {
        const chatRoomData = doc.data();
        if (chatRoomData?.chatEnd === 'Y') {
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              id: 'endMessage',
              content: '상담이 종료되었습니다.',
              createdAt: new Date(),
            },
          ]);
        }
      }
    });

    return () => {
      unsubscribeMessages(); // 메시지 구독 해제
      unsubscribeChatRoom(); // 채팅방 상태 구독 해제
    };
  }, [chatRoomId]);

  // useEffect(() => {
  //   if (isTransitioningToLiveChat && !isLiveChatOpend) {
  //     // 상태가 이미 변경되었는지 확인 후, 필요 시에만 설정
  //     setIsLiveChatOpend(true);
  //   }
  // }, [isTransitioningToLiveChat, isLiveChatOpend]); // 의존성 배열에 isLiveChatOpend 추가

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

  // const handleChatButtonClick = (id) => {
  //   setIsStartChatSelected(true);
  //   // 첫번째 화면에서 "채팅 상담원 연결하기" 버튼 클릭 시 선택지 화면으로 전환
  //   setSelectedAnswer(''); // 선택된 답변 초기화
  // };

  const handleBackButtonClick = () => {
    setIsStartChatSelected(false); // "뒤로 가기" 버튼 클릭 시 이전 화면으로 전환
    setIsLiveChatOpend(false); // 추가 질문 선택 상태 초기화
    setSelectedAnswer(''); // 선택된 답변 초기화
    setIsTransitioningToLiveChat(false); // 뒤로 가기 시 전환 초기화
  };

  const handleFaqClick = (id) => {
    if (id === 'chattingCounselor') {
      // '채팅 상담사 연결하기' 질문 선택 시만 LiveChat으로 전환
      setIsLiveChatOpend(true);
      setIsStartChatSelected(true);
      setIsTransitioningToLiveChat(false); // 여기는 초기화
      setSelectedAnswer('');
    } else {
      // 일반 FAQ 선택 시
      const selectedFaq = [...rankedFaqData, openChat].find(
        (faq) => faq.id === id
      );

      if (selectedFaq && selectedFaq.answer) {
        setSelectedAnswer(selectedFaq.answer);
      }
    }
  };

  const fetchUserNickname = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.error('사용자가 로그인되지 않았습니다.');
      return null;
    }
  
    // const userEmail = currentUser.email;
  
    try {
      const userDocRef = doc(db, 'users', currentUser.uid); // 유저의 이메일을 문서 ID로 사용
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const nickname = userDoc.data().nickname; // nickname 필드 가져오기
        return nickname;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };

  const ensureEmailDocumentExists = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    const userEmail = currentUser.email;

    try {
      const userDocRef = doc(db, 'users', userEmail);

      // 문서가 존재하는지 확인
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        // 문서가 존재하지 않으면 dummy 필드를 포함해 문서 생성
        const chatRoomRef = doc(db, 'chatRoom', userEmail);
        await setDoc(chatRoomRef, {
          email: userEmail,
          dummy: '', // dummy 필드에 빈 문자열 추가
          createdAt: Date.now(), // 문서 생성 시간 추가
        });
        console.log('새로운 이메일 문서가 생성되었습니다. (dummy 필드 포함)');
      } else {
        console.log('이메일 문서가 이미 존재합니다.');
      }
    } catch (error) {
      console.error('이메일 문서 생성 중 오류가 발생했습니다:', error.message);
    }
  };

  // startNewChat 함수 - 새로운 chatRoom을 생성
  const startNewChat = async (question) => {

    const currentUser = auth.currentUser;
    if (!currentUser) {
      return;
    }

    const userEmail = currentUser.email;
    const userNickname = await fetchUserNickname(); // 닉네임을 가져오는 함수
    ensureEmailDocumentExists();

    try {
      // 새로운 chatRoom 계정의 chatContent 문서를 생성
      const chatContentRef = collection(
        db,
        'chatRoom',
        userEmail,
        'chatContent'
      );

      const newChatRoom = await addDoc(chatContentRef, {
        chatTheme: question,
        nickname: userNickname,
        activeYn: 'N',
        chatEnd: 'N',
        createdAt: Date.now(), // 밀리세컨드 단위로 시간을 저장
      });

      const newChatRoomId = newChatRoom.id;
      setChatRoomId(newChatRoomId); // 상태로 chatRoomId를 설정
    } catch (error) {
    }
  };

  const handleOptionClick = async (id) => {
    const selectedOption = chatOptionsData.find((option) => option.id === id);
    if (selectedOption) {
      setSelectedAnswer(selectedOption.answer);
      setIsLoading(true);
      await startNewChat(selectedOption.question);
    } else {
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
      return;
    }

    const userEmail = currentUser.email;
    try {
      const chatContentRef = doc(
        db,
        'chatRoom',
        userEmail,
        'chatContent',
        chatRoomId
      );
      await setDoc(
        chatContentRef,
        {
          activeYn: 'Y',
          chatEnd: 'Y', // 상담 종료 처리
          endedAt: Date.now(), // 상담 종료 시간도 밀리세컨즈로 저장
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
    const currentUser = auth.currentUser;

    if (!currentUser || !chatRoomId) {
      return;
    }

    const userEmail = currentUser.email;

    try {
      const messageRef = collection(
        db,
        'chatRoom',
        userEmail,
        'chatContent',
        chatRoomId,
        'message'
      );

      await addDoc(messageRef, {
        content: message,
        createdAt: Date.now(), // 밀리세컨즈 단위로 시간을 저장
        uid: currentUser.uid,
      });
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error.message);
    }
  };

  const renderContent = () => {
    // isLiveChatOpend 또는 isTransitioningToLiveChat 중 하나라도 true이면 LiveChatting 컴포넌트 렌더링
    if (isLiveChatOpend && isTransitioningToLiveChat) {
      return (
        <LiveChatting messages={messages} onSendMessage={handleSendMessage} />
      );
    }

    // 그 외의 경우 ChatOptions를 렌더링
    if (isStartChatSelected) {
      return (
        <ChatOptions
          chatOptionsData={chatOptionsData}
          handleOptionClick={handleOptionClick}
          selectedAnswer={selectedAnswer}
          isLoading={isLoading}
        />
      );
    }

    // 기본적으로 FaqQuestions를 렌더링
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