import React, { useEffect, useState } from "react";
import styles from "./Comment.module.scss";
import {
  addComment,
  deleteComment,
  getComment,
} from "../../api/firebase/board";
import CustomModal from "../modal/CustomModal";
import Radio from "../complain/Radio";
import { useSelector } from "react-redux";

const loginUser = JSON.parse(localStorage.getItem("user"));

function Comment({ item }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const docId = item.docId;
  const collectionName = item.collection;
  const { user, isAuthenticated } = useSelector((state) => state.userSlice);
  // console.log(loginUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goComplain = () => setIsModalOpen(false);

  const getComments = async () => {
    if (docId) {
      const fetchComment = await getComment(collectionName, docId);
      setComments(fetchComment);
      // console.log(fetchComment);
    }
  };

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const commentObj = {
      text: newComment,
      nickName: loginUser.nick,
      userId: loginUser.email,
    };

    const success = await addComment(collectionName, docId, commentObj);
    if (success) {
      setNewComment(""); // 입력 필드 초기화
      getComments();
    }
  };

  // 댓글 삭제하는 함수
  const handleDeleteComment = async (commentId) => {
    const success = await deleteComment(collectionName, docId, commentId);
    if (success) {
      getComments(); // 댓글 목록을 다시 불러옴
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  useEffect(() => {
    // 로그인 상태가 변경되면 댓글을 다시 로드
    if (isAuthenticated) {
      getComments();
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <h2>댓글({comments.length}개)</h2>
      {comments.map((comment) => (
        <div className={styles.comment} key={comment.id}>
          <h4>{comment.text}</h4>
          <div className={styles.user}>
            <div>
              <p>
                {comment.nickName} <span>{comment.createdAt}</span>
              </p>
            </div>
            <div>
              {comment.nickName === loginUser?.nick ? (
                <div>
                  <button>수정</button>
                  <p>/</p>
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    삭제
                  </button>
                </div>
              ) : (
                <div>
                  <button className={styles.complain} onClick={openModal}>
                    🚨신고하기
                  </button>
                  <CustomModal
                    title={"신고하기"}
                    btnName={"접수"}
                    handleClose={closeModal}
                    isOpen={isModalOpen}
                    btnHandler={goComplain}
                    className={styles.modal}
                  >
                    <Radio />
                  </CustomModal>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className={styles.input}>
        <input
          type="text"
          placeholder="댓글을 입력하세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>댓글달기</button>
      </div>
    </div>
  );
}

export default Comment;
