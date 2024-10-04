import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import CustomModal from "../../../../components/modal/CustomModal";
import CpSanction from "./CpSanction";
import { Link } from "react-router-dom";
import { deleteComment } from "../../../../api/board";
import { useDispatch } from "react-redux";
import {
  approveComplaint,
  approveSuspend,
  fetchProcessed,
  fetchProcessing,
} from "../../../../store/complain/complainSlice";

function CpComment({ item, process }) {
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

  // 댓글 삭제하는 함수
  const handleDeleteCm = async () => {
    try {
      const success = await deleteComment(
        item.category,
        item.postDocId,
        item.commentDocId
      );
      if (success) {
        alert("댓글이 성공적으로 삭제되었습니다.");
      } else {
        alert("댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      alert("댓글 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.comment}>
          {/* <Link to={`/community/${item.category}/${item.postId}`}> */}
          <h3>{item.text}</h3>
          {/* </Link> */}
          <h4>{item.defendant}</h4>
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
                  title={"댓글 신고 승인"}
                  btnName={"승인"}
                  handleClose={closeModal}
                  isOpen={isModalOpen}
                  btnHandler={goProcessed}
                >
                  <div className={styles.modlaComment}>
                    <h3>{item.text}</h3>
                    <p>{item.defendant}</p>
                  </div>
                  <div className={styles.processBtn}>
                    <button onClick={handleDeleteCm}>댓글 삭제</button>
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

export default CpComment;
