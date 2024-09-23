import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import CustomModal from "../../../../components/modal/CustomModal";
import CpModal from "./CpModal";
import { Link } from "react-router-dom";

function CpComment({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goProcessed = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.comment}>
          <Link to={`/community/${item.category}/${item.postId}`}>
            <h3>{item.text}</h3>
          </Link>
          <h4>{item.defendant}</h4>
        </div>
        <div className={styles.care}>
          <p>신고사유: {item.reasonName}</p>
          <p>신고자: {item.complainant}</p>
          <div>
            <button onClick={openModal}>승인</button>
            <CustomModal
              title={"댓글 신고 승인"}
              btnName={"승인"}
              handleClose={closeModal}
              isOpen={isModalOpen}
              btnHandler={goProcessed}
            >
              <div>
                <p>{item.text}</p>
                <p>{item.defendant}</p>
              </div>
              <div>
                <button>댓글 삭제</button>
                <button>활동 정지</button>
              </div>
            </CustomModal>
            <CpModal />
          </div>
        </div>
      </div>
    </>
  );
}

export default CpComment;
