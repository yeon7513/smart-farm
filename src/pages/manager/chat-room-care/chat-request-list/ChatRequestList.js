import React, { useState } from "react";
import styles from "./ChatRequestList.module.scss";
import ChatRequestItem from "./chat-request-item/ChatRequestItem";

function ChatRequestList({ chatRequests, onApproveChat }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(chatRequests.length / itemsPerPage);

  const currentItems = chatRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    let paginationItems = [];

    paginationItems.push(
      <button
        key="1"
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? styles.active : ""}
      >
        1
      </button>
    );

    if (currentPage > 5) {
      paginationItems.push(
        <button key={`dot-prev`} className={styles.dotButton} disabled>
          ...
        </button>
      );
    }

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

    if (currentPage < totalPages - 4) {
      paginationItems.push(
        <button key={`dot-next`} className={styles.dotButton} disabled>
          ...
        </button>
      );
    }

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
      {currentItems.length === 0 ? (
        <p>채팅 요청이 없습니다.</p>
      ) : (
        <ul className={styles.list}>
          {currentItems.map((chat) => (
            <ChatRequestItem
              key={chat.id}
              chat={chat}
              onApprove={() => onApproveChat(chat.id, chat.userEmail)}
            />
          ))}
        </ul>
      )}

      <div className={styles.pagination}>{renderPagination()}</div>
    </div>
  );
}

export default ChatRequestList;
