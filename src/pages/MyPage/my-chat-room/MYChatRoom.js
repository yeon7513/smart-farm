import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Container from '../../../components/layout/container/Container';
import styles from './MYChatRoom.module.scss';

function MYChatRoom() {
  const [chatContents, setChatContents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // 한 페이지당 5개의 항목
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchChatContents = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const chatRoomRef = collection(db, `chatRoom/${user.email}/chatContent`);
          const chatContentSnapshot = await getDocs(chatRoomRef);
          let chatData = chatContentSnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
            messages: [],
          }));

          // 생성일 기준으로 최신 순으로 정렬
          chatData = chatData.sort((a, b) => b.createdAt - a.createdAt);

          const fetchMessages = async (chatRoomId) => {
            const messagesRef = collection(db, `chatRoom/${user.email}/chatContent/${chatRoomId}/message`);
            const messageSnapshot = await getDocs(messagesRef);
            const messages = messageSnapshot.docs.map((doc) => doc.data());

            // 메시지 전송시간 기준으로 오름차순 정렬 (시간 순서대로)
            return messages.sort((a, b) => a.createdAt - b.createdAt);
          };

          const updatedChatData = await Promise.all(
            chatData.map(async (chat) => {
              const messages = await fetchMessages(chat.id);
              return { ...chat, messages };
            })
          );

          setChatContents(updatedChatData);
        }
      } catch (error) {
        console.error('Error fetching chat contents: ', error);
      }
    };

    fetchChatContents();
  }, [auth, db]);

  // 현재 페이지에 맞는 상담 내역만 표시
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chatContents.slice(indexOfFirstItem, indexOfLastItem);

  // 총 페이지 수
  const totalPages = Math.ceil(chatContents.length / itemsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션 버튼 생성 로직
  const renderPagination = () => {
    const paginationButtons = [];

    // 항상 1페이지 추가
    paginationButtons.push(
      <button
        key={1}
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? styles.activePage : ''}
      >
        1
      </button>
    );

    // 2, 3 페이지를 추가
    if (totalPages > 1) {
      paginationButtons.push(
        <button
          key={2}
          onClick={() => handlePageChange(2)}
          className={currentPage === 2 ? styles.activePage : ''}
        >
          2
        </button>
      );
    }

    if (totalPages > 2) {
      paginationButtons.push(
        <button
          key={3}
          onClick={() => handlePageChange(3)}
          className={currentPage === 3 ? styles.activePage : ''}
        >
          3
        </button>
      );
    }

    // 현재 페이지가 3보다 크면 "..." 추가
    if (currentPage > 3 && totalPages > 4) {
      paginationButtons.push(<span key="dots">...</span>);
    }

    // 끝 페이지 추가 (마지막 페이지는 항상 표시)
    if (totalPages > 3) {
      paginationButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? styles.activePage : ''}
        >
          끝 ({totalPages})
        </button>
      );
    }

    return paginationButtons;
  };

  return (
    <Container className={styles.container}>
      <div className={styles.main}>
        <h2>상담내역</h2>
        {currentItems.length > 0 ? (
          <div>
            {currentItems.map((chat) => (
              <div key={chat.id} className={styles.chatItem}>
                <div>상담 카테고리: {chat.chatTheme}</div>
                <div>상담 종료 여부: {chat.chatEnd}</div>
                <div>
                  생성일: {chat.createdAt
                    ? new Date(chat.createdAt).toLocaleDateString()
                    : '날짜 정보 없음'}
                </div>
                <div className={styles.messageList}>
                  <h3>상담 내용</h3>
                  {chat.messages.length > 0 ? (
                    chat.messages.map((message, index) => (
                      <div
                        key={index}
                        className={
                          message.uid === auth.currentUser.uid
                            ? styles.myMessage // 내 메시지일 때 스타일
                            : styles.adminMessage // 관리자 메시지일 때 스타일
                        }
                      >
                        <div>{message.content}</div>
                        <div>
                          {message.createdAt
                            ? new Date(message.createdAt).toLocaleTimeString() // 전송시간 텍스트 삭제하고 시간만 출력
                            : '시간 정보 없음'}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noMessage}>상담 내용이 없습니다.</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>상담 내역이 없습니다.</div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {renderPagination()}
          </div>
        )}
      </div>
    </Container>
  );
}

export default MYChatRoom;
