import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import CustomModal from "../../../../components/modal/CustomModal";
import CpSanction from "./CpSanction";
import { useDispatch } from "react-redux";
import { deleteBoardDatas } from "../../../../store/board/boardSlice";
import {
  approveComplaint,
  approveSuspend,
  fetchProcessed,
  fetchProcessing,
} from "../../../../store/complain/complainSlice";

function CpPost({ item, process }) {
  const processYy = {
    y: "거부",
    Y: "승인",
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();

  const goProcessed = () => {
    dispatch(
      approveComplaint({ userId: item.defendantDocId, complainId: item.docId })
    )
      .then(() => {
        alert("신고가 승인되었습니다.");
        setIsModalOpen(false); // 모달 닫기

        if (process === "processing") {
          dispatch(fetchProcessing(process));
        } else {
          dispatch(fetchProcessed(process));
        }
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };

  // 활동 정지
  const goSuspend = () => {
    dispatch(approveSuspend({ userId: item.defendantDocId }))
      .then(() => {
        alert("해당 유저를 활동 정지 처리하였습니다.");
      })
      .catch((error) => {
        console.error(error);
        alert("오류가 발생했습니다.");
      });
  };

  const handleDeletePost = () => {
    dispatch(
      deleteBoardDatas({ category: item.category, docId: item.postDocId })
    )
      .then(() => {
        alert("게시글이 성공적으로 삭제되었습니다.");
        // setIsModalOpen(false);
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
          {/* <Link to={`/community/${item.category}/${item.postId}`}> */}
          <div className={styles.title}>
            <h2>{item.title}</h2>
            <div>
              <img src={item.photoUrl} alt="" />
              <h4>{item.defendant}</h4>
            </div>
          </div>
          <div className={styles.summary}>
            <h3>{item.summary}</h3>
            {item.imgUrl ? <img src={item.imgUrl} alt="첨부 이미지" /> : ""}
          </div>
          {/* </Link> */}
        </div>
        <div className={styles.care}>
          <div className={styles.careUser}>
            <p>신고사유: {item.reasonName}</p>
            <p>신고자: {item.complainant}</p>
          </div>
          <div>
            {process === "processing" ? (
              <>
                <button onClick={openModal}>승인</button>
                <CustomModal
                  title={"게시글 신고 승인"}
                  btnName={"승인"}
                  handleClose={closeModal}
                  isOpen={isModalOpen}
                  btnHandler={goProcessed}
                >
                  <div className={styles.container}>
                    <div className={styles.modalTitle}>
                      <div>
                        <h2>{item.title}</h2>
                      </div>
                      <div>
                        <div className={styles.titleBar}>
                          <div className={styles.modalProfile}>
                            <img src={item.photoUrl} alt="" />
                            <p>작성자: {item.defendant}</p>
                          </div>
                          <p>작성일: {item.createdAt}</p>
                          {/* <p>조회수: {count}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className={styles.modalSummary}>
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
                    <button onClick={() => handleDeletePost()}>
                      게시글 삭제
                    </button>
                    <button onClick={goSuspend}>활동 정지</button>
                  </div>
                </CustomModal>

                <CpSanction
                  complainant={item.complainantDocId}
                  complainId={item.docId}
                />
              </>
            ) : (
              <div className={styles.processed}>
                <p>처리일: {item.processedAt}</p>
                <p>처리 결과: {processYy[item.processYn]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CpPost;
