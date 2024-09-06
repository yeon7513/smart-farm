import React, { useEffect, useState } from "react";
import styles from "./Comment.module.scss";
import { addComment, getComment } from "../../api/firebase/board";

const loginUser = JSON.parse(localStorage.getItem("user"));

function Comment({ item }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const docId = item.docId;
  const collectionName = item.collection;

  const getComments = async () => {
    if (docId) {
      const fetchComment = await getComment(collectionName, docId);
      setComments(fetchComment);
      // console.log(fetchComment);
    }
  };

  useEffect(() => {
    getComments();
  }, [docId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    const commentObj = {
      text: newComment,
      nickName: loginUser.nick,
    };

    const success = await addComment(collectionName, docId, commentObj);
    if (success) {
      setNewComment(""); // 입력 필드 초기화
      getComments();
    }
  };

  return (
    <div className={styles.comment}>
      <h2>댓글({comments.length}개)</h2>
      {comments.map((comment) => (
        <div>
          <h4>{comment.text}</h4>
          <p>
            {comment.nickName} <span>{comment.createdAt}</span>
          </p>
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
