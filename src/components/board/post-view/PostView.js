import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./PostView.module.scss";
import { getBoardDatas, incrementPostCount } from "../../../api/firebase/board";
import CustomModal from "../../modal/CustomModal";
import Radio from "../../complain/Radio";
import Comment from "../../comment/Comment";

function PostView() {
  const navigate = useNavigate();
  // const [post, setPost] = useState(null);
  const { state } = useLocation();
  const [count, setCount] = useState(state.count || 0);
  console.log(state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const updatePostCount = async () => {
    if (state?.collection && state?.docId) {
      try {
        await incrementPostCount(state.collection, state.docId);
        setCount((prevCount) => prevCount + 1);
      } catch (error) {
        console.error("Error incrementing post count: ", error);
      }
    }
  };

  useEffect(() => {
    updatePostCount();
  }, [state]);

  if (!state) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <div>
            <h2>{state.title}</h2>
          </div>
          <div>
            <div>
              <p>작성자: {state.userId}</p>
              <p>작성일: {state.createAt}</p>
              <p>조회수: {count}</p>
            </div>
            {state.complain && (
              <div>
                <button onClick={openModal}>🚨 신고하기</button>
                <CustomModal
                  title={"신고하기"}
                  btnName={"접수"}
                  handleClose={closeModal}
                  isOpen={isModalOpen}
                >
                  <Radio />
                </CustomModal>
              </div>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <div>{state.summary}</div>
          <div>
            <img src={state.imgUrl} alt="이미지" />
          </div>
        </div>
        <div>
          <Comment />
        </div>
        <div className={styles.input}>
          <input />
          <button>댓글달기</button>
        </div>
        <div className={styles.back}>
          <button onClick={() => navigate(-1)}>목록으로</button>
        </div>
      </div>
    </>
  );
}

export default PostView;
