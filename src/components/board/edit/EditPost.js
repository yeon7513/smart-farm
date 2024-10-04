import React, { useState } from "react";
import { updatePost } from "../../../api/board";
import styles from "./EditPost.module.scss";

function EditPost({ post, setIsEditing, onPostUpdate }) {
  const [title, setTitle] = useState(post?.title || "");
  const [summary, setSummary] = useState(post?.summary || "");

  const handleUpdatePost = async () => {
    if (!post?.collection || !post?.docId) return;

    const updatedPost = { title, summary };

    try {
      const success = await updatePost(
        post.collection,
        post.docId,
        updatedPost
      );
      if (success) {
        await onPostUpdate();
      }
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSummaryChange = (e) => setSummary(e.target.value);

  return (
    <div className={styles.container}>
      <div>
        <h3>게시글 수정하기</h3>
      </div>
      <div className={styles.title}>
        <p>제목:</p>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className={styles.content}>
        <p>내용:</p>
        <textarea
          name="summary"
          value={summary}
          onChange={handleSummaryChange}
        />
      </div>
      <b>
        ※ 부적절한 콘텐츠가 포함될 경우 관리자에 의해 게시글이 삭제될 수 있으며,
        해당 아이디가 정지 처리될 수 있습니다.
      </b>

      <div className={styles.btn}>
        <div>
          <button onClick={handleUpdatePost} className={styles.sub}>
            수정 완료
          </button>
          <button onClick={() => setIsEditing(false)}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default EditPost;
