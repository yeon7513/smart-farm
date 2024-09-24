import React, { useEffect, useState } from "react";
import styles from "./AsCareItem.module.scss";
import { getBoardDatas } from "../../../../api/board";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/modal/CustomModal";
import Comment from "./../../../../components/comment/Comment";

const PAGE_SIZE = 20;

function AsCareItem({ items }) {
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goCompleted = () => {
    setIsModalOpen(false);
  };

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
        <div>내용</div>
        <div>작성자</div>
        <div>작성일</div>
        <div>상태</div>
      </div>

      <div className={styles.board}>
        <ul>
          {currentItem.map((item, idx) => (
            // <Link to={`/community/as/${item.id}`}>
            <li
              key={idx}
              id={item.length - ((currentPage - 1) * PAGE_SIZE + idx)}
            >
              <div>{item.id}</div>
              <div>{item.summary}</div>
              <div>{item.nick}</div>
              <div>{item.createdAt}</div>

              <div>
                <button onClick={openModal}>{item.completedYn}</button>
                <CustomModal
                  title={"A/S 답변"}
                  btnName={"완료"}
                  handleClose={closeModal}
                  isOpen={isModalOpen}
                  btnHandler={goCompleted}
                >
                  <div className={styles.ModalContainer}>
                    <div className={styles.modlaTitle}>
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <div className={styles.titleBar}>
                          <div className={styles.ModalProfile}>
                            {/* <img src={post.profileImg} /> */}
                            <p>작성자: {item.defendant}</p>
                          </div>
                          <p>작성일: {item.createdAt}</p>
                          {/* <p>조회수: {count}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className={styles.modlaContent}>
                      <div>{item.summary}</div>
                      <div>
                        {item.imgUrl ? (
                          <img src={item.imgUrl} alt="첨부 이미지" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </CustomModal>
              </div>
            </li>
            // </Link>
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
