import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Comment from "../../../../components/comment/Comment";
import CustomModal from "../../../../components/modal/CustomModal";
import { approveComplete } from "../../../../store/as-service/asSlice";
import styles from "./AsCareItem.module.scss";

const PAGE_SIZE = 20;

function AsCareItem({ items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // 현재 선택된 아이템의 데이터를 저장

  const dispatch = useDispatch();

  // 모달
  const openModal = (item) => {
    setIsModalOpen(true);
    setCurrentItem(item); // 모달 열 때 해당 아이템의 데이터를 설정
  };
  const closeModal = () => setIsModalOpen(false);

  const goCompleted = () => {
    if (currentItem && currentItem.docId) {
      dispatch(approveComplete({ postId: currentItem.docId }))
        .then(() => {
          alert("답변 완료 되었습니다.");
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error(error);
          alert("오류가 발생했습니다.");
        });
    }
  };

  // 페이지네이션
  const totalPages = Math.ceil(items.length / PAGE_SIZE);
  const currentItems = items.slice(
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
          {currentItems.length > 0 ? (
            currentItems.map((item, idx) => (
              <li
                key={idx}
                id={items.length - ((currentPage - 1) * PAGE_SIZE + idx)}
              >
                <div>{item.id}</div>
                <div>
                  {item.summary.length > 30
                    ? `${item.summary.slice(0, 30)}...`
                    : item.summary}
                </div>
                <div>{item.nick}</div>
                <div>{item.createdAt}</div>

                <div>
                  <button onClick={() => openModal(item)}>
                    {item.completeYn}
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className={styles.noPost}>문의내역이 없습니다.</div>
          )}
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

      {isModalOpen && currentItem && (
        <CustomModal
          title={"A/S 답변"}
          btnName={"완료"}
          handleClose={closeModal}
          isOpen={isModalOpen}
          btnHandler={goCompleted}
          className={styles.modal}
        >
          <div className={styles.modalContainer}>
            <div className={styles.modlaTitle}>
              <div>
                <h2>{currentItem.title}</h2>
              </div>
              <div>
                <div className={styles.titleBar}>
                  <div className={styles.modalProfile}>
                    <p>작성자: {currentItem.defendant}</p>
                  </div>
                  <p>작성일: {currentItem.createdAt}</p>
                </div>
              </div>
            </div>
            <div className={styles.modlaContent}>
              <div>{currentItem.summary}</div>
              <div>
                {currentItem.imgUrl ? (
                  <img src={currentItem.imgUrl} alt="첨부 이미지" />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className={styles.comment}>
              <Comment item={currentItem} />
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
}

export default AsCareItem;
