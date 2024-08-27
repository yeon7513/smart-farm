import React, { useState } from "react";
import styles from "./Board.module.scss";
import { Link } from "react-router-dom";
import SharingItem from "./sharing/BoardItem";

const PAGE_SIZE = 10;

function Board({ items }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);

  const currentPosts = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div>
        <h4>아이팜 회원님들의 정보 공유 게시판입니다.</h4>
      </div>
      <div className={styles.col}>
        <div>NO.</div>
        <div>제목</div>
        <div>작성자</div>
        <div>작성일</div>
        <div>댓글</div>
      </div>
      <div className={styles.board}>
        <ul>
          {items.map((item, idx) => (
            <SharingItem
              key={idx}
              id={item.id}
              title={item.title}
              user={item.user}
              date={item.date}
              comment={item.comment}
            />
          ))}
        </ul>
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className={currentPage === i + 1 ? styles.activePage : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className={styles.upload}>
        <button>글쓰기</button>
      </div>
    </div>
  );
}

export default Board;
