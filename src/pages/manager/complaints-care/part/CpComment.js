import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import CustomModal from "../../../../components/modal/CustomModal";

function CpComment({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [noModalOpen, setNoModalOpen] = useState(false);
  const openNoModal = () => setNoModalOpen(true);
  const closeNoModal = () => setNoModalOpen(false);

  const goProcessed = () => {
    setIsModalOpen(false);
  };
  const noProcessed = () => {
    setNoModalOpen(false);
  };

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.comment}>
          <h3>우웩 완전 별로 ㅡㅡ</h3>
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
                <p>댓글 내용</p>
                <p>닉네임</p>
              </div>
              <div>
                <button>댓글 삭제</button>
                <button>활동 정지</button>
              </div>
            </CustomModal>
            <button onClick={openNoModal}>거부</button>
            <CustomModal
              title={"댓글 신고 거부"}
              btnName={"제재"}
              handleClose={closeNoModal}
              isOpen={noModalOpen}
              btnHandler={noProcessed}
            >
              <div>
                <p>신고자 플필 사진</p>
                <p>신고자 닉네임</p>
                <p>신고자에게 허위신고 제재를 내리시겠습니까?</p>
              </div>
            </CustomModal>
          </div>
        </div>
      </div>
    </>
  );
}

export default CpComment;
