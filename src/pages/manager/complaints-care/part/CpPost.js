import React, { useState } from "react";
import styles from "../ComplaintsCare.module.scss";
import { Link } from "react-router-dom";
import CustomModal from "../../../../components/modal/CustomModal";
import CpModal from "./CpModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteBoardDatas } from "../../../../store/board/boardSlice";
import { approveComplaint } from "../../../../store/complain/complainSlice";

function CpPost({ item, process }) {
  // console.log(item);
  const processYy = {
    y: "거부",
    Y: "승인",
  };

  // console.log(item);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();
  // const { processing } = useSelector((state) => state.complainSlice);

  const goProcessed = () => {
    dispatch(
      approveComplaint({ userId: item.defendantDocId, complainId: item.docId })
    )
      .then(() => {
        alert("신고가 승인되었습니다.");
        setIsModalOpen(false); // 모달 닫기
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
        // alert("게시글이 성공적으로 삭제되었습니다.");
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
          <Link to={`/community/${item.category}/${item.postId}`}>
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
          </Link>
        </div>
        <div className={styles.care}>
          <p>신고사유: {item.reasonName}</p>
          <p>신고자: {item.complainant}</p>
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
                    <div className={styles.modlaTitle}>
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
                    <button onClick={() => handleDeletePost()}>
                      게시글 삭제
                    </button>
                    <button>활동 정지</button>
                  </div>
                </CustomModal>

                <CpModal
                  complainant={item.complainantDocId}
                  complainId={item.docId}
                />
              </>
            ) : (
              <div className={styles.processed}>
                <div>처리일: {item.processedAt}</div>
                <div>처리 결과: {processYy[item.processYn]}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CpPost;
