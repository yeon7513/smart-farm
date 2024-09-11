// components/comment/Comment.js
import React, { useEffect, useState } from "react";
import styles from "./Comment.module.scss";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment, // 댓글 수정 함수 추가
} from "../../api/firebase/board";
import CustomModal from "../modal/CustomModal";
import Radio from "../complain/Radio";
import { useSelector } from "react-redux";

const loginUser = JSON.parse(localStorage.getItem("user"));

function Comment({ item }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const docId = item.docId;
  const collectionName = item.collection;
  const { isAuthenticated } = useSelector((state) => state.userSlice);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const goComplain = () => setIsModalOpen(false);

  const getComments = async () => {
    if (docId) {
      const fetchComment = await getComment(collectionName, docId);
      setComments(fetchComment);
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

  // 댓글 수정 모드로 전환하는 함수
  const handleEditClick = (comment) => {
    setEditComment(comment.text);
    setEditCommentId(comment.id);
  };

  // 댓글 수정 취소
  const handleCancelEdit = () => {
    setEditComment("");
    setEditCommentId(null);
  };

  // 댓글 업데이트 함수
  const handleUpdateComment = async () => {
    if (!editComment.trim()) return;

    const updatedComment = {
      text: editComment,
    };

    const success = await updateComment(
      collectionName,
      docId,
      editCommentId,
      updatedComment
    );
    if (success) {
      handleCancelEdit(); // 수정 모드 해제 및 초기화
      getComments(); // 업데이트된 댓글 목록 가져오기
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
    if (isAuthenticated) {
      getComments();
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <h2>댓글({comments.length}개)</h2>

      {comments.length === 0 ? (
        <div className={styles.noComments}>
          <p>댓글이 없습니다.</p>
        </div>
      ) : (
        comments.map((comment) => (
          <div className={styles.comment} key={comment.id}>
            {editCommentId === comment.id ? (
              <div className={styles.editMode}>
                <input
                  type="text"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <div>
                  <button onClick={handleUpdateComment}>확인</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              </div>
            ) : (
              <div>
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
                        <button onClick={() => handleEditClick(comment)}>
                          수정
                        </button>
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
            )}
          </div>
        ))
      )}
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
