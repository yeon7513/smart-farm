import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/modal/CustomModal";
import CpModal from "./CpModal";
import { useDispatch } from "react-redux";
import { deleteBoardDatas } from "../../../../store/board/boardSlice";
import { approveComplaint } from "../../../../store/complain/complainSlice";

function CpPost({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();

  const goProcessed = () => {
    dispatch(
      approveComplaint({ userId: item.defendant, complaintId: item.id })
    );
    setIsModalOpen(false);
  };

  const handleDeletePost = () => {
    dispatch(deleteBoardDatas({ category: item.category, docId: item.postId }))
      .then(() => {
        alert("게시글이 성공적으로 삭제되었습니다.");
        setIsModalOpen(false); // 모달 닫기
      })
      .catch((error) => {
        alert("게시글 삭제 중 오류가 발생했습니다.");
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.post}>
          <Link to={`/community/${item.category}/${item.postId}`}>
            <div className={styles.title}>
              <h2>{item.title}</h2>
              <div>
                <img src={ex} alt="" />
                <h4>{item.defendant}</h4>
              </div>
            </div>
            <div className={styles.summary}>
              <h3>{item.summary}</h3>
              {item.imgUrl ? <img src={item.imgUrl} alt="첨부 이미지" /> : ""}
            </div>
          </Link>
        </div>
        <div className={styles.care}>
          <p>신고사유: {item.reasonName}</p>
          <p>신고자: {item.complainant}</p>
          <div>
            <button onClick={openModal}>승인</button>
            <CustomModal
              title={"게시글 신고 승인"}
              btnName={"승인"}
              handleClose={closeModal}
              isOpen={isModalOpen}
              btnHandler={goProcessed}
            >
              <div className={styles.container}>
                <div className={styles.modlaTitle}>
                  <div>
                    <h2>{item.title}</h2>
                  </div>
                  <div>
                    <div className={styles.titleBar}>
                      <div className={styles.profile}>
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
              <div className={styles.processBtn}>
                <button onClick={() => handleDeletePost()}>게시글 삭제</button>
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

export default CpPost;
