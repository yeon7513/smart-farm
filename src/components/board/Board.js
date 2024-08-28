import React, { useState } from "react";
import styles from "./Board.module.scss";
import BoardItem from "./boardItem/BoardItem";
import { useComponentContext } from "../../context/ComponentContext";
import Post from "./post/Post";

const PAGE_SIZE = 10;

function Board({ items, nopost }) {
  const [currentPage, setCurrentPage] = useState(1);
  const { currComp, setCurrComp } = useComponentContext();
  const [post, setPost] = useState(items); // 게시글 상태
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const reversedItem = [...items].reverse();
  const currentItem = reversedItem.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const PreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const NextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openPost = (item) => {
    setCurrComp(item);
  };

  const addPost = (newPost) => {
    setPost([...post, newPost]); // 새로운 게시글을 추가
    setIsWriting(false); // 글쓰기 모드 종료
  };

  return (
    <div className={styles.container}>
      {/* 글쓰기 모드 */}
      {isWriting ? (
        <Post onSubmit={addPost} />
      ) : (
        <>
          <div className={styles.col}>
            <div>NO.</div>
            <div>제목</div>
            <div>작성자</div>
            <div>작성일</div>
            <div>조회수</div>
          </div>

          <div className={styles.board}>
            <ul>
              {currentItem.map((item, idx) => (
                <li key={idx} onClick={() => openPost(item)}>
                  <BoardItem
                    id={items.length - ((currentPage - 1) * PAGE_SIZE + idx)}
                    title={item.title}
                    user={item.user}
                    date={item.date}
                    comment={item.comment}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.pagination}>
            <button
              onClick={PreviousPage}
              disabled={currentPage === 1} // 첫 페이지에서는 비활성화
            >
              &lt; 이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={NextPage}
              disabled={currentPage === totalPages} // 마지막 페이지에서는 비활성화
            >
              다음 &gt;
            </button>
          </div>
          {nopost === false ? (
            ""
          ) : (
            <div className={styles.upload}>
              {<button onClick={() => setIsWriting(true)}>글쓰기</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Board;
