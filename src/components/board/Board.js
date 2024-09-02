import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBoardDatas } from '../../api/firebase/board';
import styles from './Board.module.scss';
import Post from './post/Post';

const PAGE_SIZE = 10;

function Board({ nopost, category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [post, setPost] = useState(); // 게시글 상태
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모드 상태
  const [view, setView] = useState([]);

  const totalPages = Math.ceil(view.length / PAGE_SIZE);
  const reversedItem = [...view].reverse();
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

  const addPost = (newPost) => {
    setPost([...post, newPost]); // Add new post
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

  return (
    <div className={styles.container}>
      {/* 글쓰기 모드 */}
      {isWriting ? (
        <Post onSubmit={addPost} onClick={notPosting} />
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
                  state={{ ...item }}
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
            ''
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
