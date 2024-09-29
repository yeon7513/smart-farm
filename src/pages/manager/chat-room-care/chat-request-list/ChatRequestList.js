import React, { useState } from "react";
import styles from "./ChatRequestList.module.scss";
import ChatRequestItem from "./chat-request-item/ChatRequestItem";

function ChatRequestList({ chatRequests, onApproveChat }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 총 페이지 수 계산
  const totalPages = Math.ceil(chatRequests.length / itemsPerPage);

  // 현재 페이지의 아이템 목록을 계산
  const currentItems = chatRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // 페이지 버튼 목록 생성
  const renderPagination = () => {
    let paginationItems = [];

    // 처음 버튼
    paginationItems.push(
      <button
        key="1"
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? styles.active : ""}
      >
        1
      </button>
    );

    // "..." 버튼 (중간에 건너뛸 수 있는 페이지)
    if (currentPage > 5) {
      paginationItems.push(
        <button key={`dot-prev`} className={styles.dotButton} disabled>
          ...
        </button>
      );
    }

    // 중간 페이지 버튼 (현재 페이지 기준 +-2로 제한)
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);
    for (let i = startPage; i <= endPage; i++) {
      paginationItems.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? styles.active : ""}
        >
          {i}
        </button>
      );
    }

    // "..." 버튼 (끝으로 건너뛸 수 있는 페이지)
    if (currentPage < totalPages - 4) {
      paginationItems.push(
        <button key={`dot-next`} className={styles.dotButton} disabled>
          ...
        </button>
      );
    }

    // 마지막 페이지 버튼
    paginationItems.push(
      <button
        key={totalPages}
        onClick={() => handlePageChange(totalPages)}
        className={currentPage === totalPages ? styles.active : ""}
      >
        {totalPages}
      </button>
    );

    return paginationItems;
  };

  return (
    <div>
      <ul className={styles.list}>
        {currentItems.map((chat) => (
          <ChatRequestItem
            key={chat.id}
            chat={chat}
            onApprove={() => onApproveChat(chat.id, chat.userEmail)}
          />
        ))}
      </ul>

      {/* 페이지네이션 버튼 */}
      <div className={styles.pagination}>{renderPagination()}</div>
    </div>
  );
}

export default ChatRequestList;