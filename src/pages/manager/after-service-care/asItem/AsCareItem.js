import React, { useEffect, useState } from "react";
import styles from "./AsCareItem.module.scss";
import { getBoardDatas } from "../../../../api/board";
import { Link } from "react-router-dom";

const PAGE_SIZE = 20;

function AsCareItem({ items }) {
  //   const [view, setView] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  //   const handleLoad = async () => {
  //     const data = await getBoardDatas("as");
  //     setView(data);
  //   };

  //   useEffect(() => {
  //     handleLoad();
  //   }, []);

  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const currentItem = items.slice(
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
  return (
    <div>
      <div className={styles.col}>
        <div>NO.</div>
        <div>제목</div>
        <div>작성자</div>
        <div>작성일</div>
        <div>상태</div>
      </div>

      <div className={styles.board}>
        <ul>
          {currentItem.map((item, idx) => (
            <Link to={`/community/as/${item.id}`}>
              <li
                key={idx}
                id={item.length - ((currentPage - 1) * PAGE_SIZE + idx)}
              >
                <div>{item.id}</div>
                <div>{item.summary}</div>
                <div>{item.nick}</div>
                <div>{item.createdAt}</div>
                <div>{item.completedYn}</div>
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
    </div>
  );
}

export default AsCareItem;
