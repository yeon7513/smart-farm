import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { GridLoader } from "react-spinners";
import {
  deletePost,
  getPostById,
  incrementPostCount,
} from "../../../api/board";
import { addComplain } from "../../../store/complain/complainSlice";
import Comment from "../../comment/Comment";
import Radio from "../../complain/Radio";
import CustomModal from "../../modal/CustomModal";
import EditPost from "../edit/EditPost";
import styles from "./PostView.module.scss";

function PostView() {
  const loginUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { state } = useLocation();
  const [count, setCount] = useState(state?.count);
  const { isAuthenticated } = useSelector((state) => state.userSlice);
  const [isEditing, setIsEditing] = useState(false);
  const [post, setPost] = useState(state); // 게시글 상태 추가
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const [selectedReason, setSelectedReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goComplain = async () => {
    if (selectedReason) {
      const complainData = {
        defendant: post.nick,
        photoUrl: post.photoUrl,
        defendantDocId: post.userDocId,
        complainant: loginUser.nickname,
        complainantDocId: loginUser.docId,
        reasonCode: selectedReason.code, // 'pf_01' 등의 코드 사용
        reasonName: selectedReason.name,
        createdAt: new Date().toISOString().split("T")[0],
        processedAt: "",
        processYn: "n",
        category: post.category,
        postId: post.id,
        postDocId: post.docId,
        // profileUrl: post.photoUrl,
        title: post.title,
        summary: post.summary,
        imgUrl: post.imgUrl,
        type: "post",
      };

      dispatch(addComplain({ collectionName: "complain", complainData }))
        .then(() => {
          closeModal(); // 성공 시 모달 닫기
        })
        .catch((error) => {
          console.log(" 접수 중 오류 발생:", error);
        });
    } else {
      setErrorMessage("신고 사유를 선택해주세요.");
    }
  };

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

  // 게시글 삭제하는 함수
  const handleDeletePost = async () => {
    const success = await deletePost(state.collection, state.docId);
    if (success) {
      navigate(-1); // 삭제 후 이전 페이지로 이동
    }
  };

  const handlePostUpdate = async () => {
    try {
      const updatedPost = await getPostById(post.collection, post.docId);
      setPost(updatedPost); // 수정된 데이터로 상태 업데이트
      setIsEditing(false); // 수정 모드 종료
    } catch (error) {
      console.error("게시글 업데이트 중 오류 발생: ", error);
    }
  };

  useEffect(() => {
    updatePostCount();
  }, [post.docId]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!state) {
    return (
      <div className={styles.loading}>
        <GridLoader color="#a2ca71" margin={5} size={20} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {isEditing ? (
          <EditPost
            post={post}
            setIsEditing={setIsEditing}
            onPostUpdate={handlePostUpdate}
          />
        ) : (
          <>
            <div className={styles.title}>
              <div>
                <h2>{post.title}</h2>
              </div>
              <div>
                <div className={styles.titleBar}>
                  <div className={styles.profile}>
                    <img src={post.photoUrl} alt="" />
                    <p>{post.nick}</p>
                  </div>
                  <p>작성일: {post.createdAt}</p>
                  <p className={styles.count}>조회수: {count}</p>
                </div>
                {post.nick === loginUser?.nickname ? (
                  <div className={styles.test}>
                    <button onClick={() => setIsEditing(true)}>수정</button>
                    <p>/</p>
                    <button onClick={handleDeletePost}>삭제</button>
                  </div>
                ) : (
                  post.complain && (
                    <div className={styles.complain}>
                      <button onClick={openModal}>🚨 신고하기</button>
                      <CustomModal
                        title={"신고하기"}
                        btnName={"접수"}
                        handleClose={closeModal}
                        isOpen={isModalOpen}
                        btnHandler={goComplain}
                        className={styles.modal}
                      >
                        <Radio
                          selectedRadio={setSelectedReason}
                          errorMessage={errorMessage}
                        />
                      </CustomModal>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className={styles.content}>
              <div>{post.summary}</div>
              <div>
                {state.imgUrl ? (
                  <img src={post.imgUrl} alt="첨부 이미지" />
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <Comment item={post} />
            </div>

            <div className={styles.back}>
              <button onClick={() => navigate(-1)}>목록으로</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PostView;
