import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getBoardDatas } from "../../api/firebase/board";
import styles from "./Board.module.scss";
import Post from "./post/Post";
import { getUserAuth } from "../../api/firebase";

const PAGE_SIZE = 10;

function Board({ nopost, category, complain }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태
  const [view, setView] = useState([]);
  const auth = getUserAuth();
  const user = auth.currentUser; // 현재 로그인된 사용자 정보 가져오기

  const totalPages = Math.ceil(view.length / PAGE_SIZE);
  const currentItem = view.slice(
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

  const addPost = (newPost) => {
    setView([...view, newPost]); // Also add to view
    setIsWriting(false); // 글쓰기 모드 종료
  };

  // 글쓰기 취소
  const notPosting = () => {
    setIsWriting(false);
  };

  const handleLoad = async () => {
    const data = await getBoardDatas(category);
    setView(data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const handleWriteClick = () => {
    if (!user) {
      alert("회원 전용입니다. 로그인을 해주세요.");
      return setIsWriting(false);
    } else {
      setIsWriting(true); // 로그인된 경우에만 글쓰기 모드로 전환
    }
  };

  return (
    <div className={styles.container}>
      {/* 글쓰기 모드 */}
      {isWriting ? (
        <Post onClick={notPosting} onSubmit={addPost} category={category} />
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
                <Link
                  key={idx}
                  to={`/community/${item.collection}/${item.id}`}
                  state={{ ...item, complain }}
                >
                  <li id={view.length - ((currentPage - 1) * PAGE_SIZE + idx)}>
                    <div>{item.id}</div>
                    <div>{item.title}</div>
                    <div>{item.userId}</div>
                    <div>{item.createAt}</div>
                    <div>{item.count}</div>
                  </li>
                </Link>
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
              {<button onClick={handleWriteClick}>글쓰기</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Board;
