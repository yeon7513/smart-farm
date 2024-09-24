import React from "react";
import styles from "./DisasterListItem.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

function DisasterLIstItem({ onDelete }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || {}; // onDelete를 props로 받음

  if (!post) {
    return <p>Post data not available</p>;
  }
  //  게시글 삭제처리
  // const handleDelete = async () => {
  //   try {
  //     await deleteDatas("disasters", post.id);
  //     onDelete(post.id); // 부모에서 받은 onDelete 호출
  //     navigate("/info/");
  //   } catch (error) {
  //     console.error("게시글 삭제 오류:", error);
  //   }
  // };

  return (
    <div className={styles.main}>
      <div className={styles.written}>
        <div className={styles.written_name}>
          <p>작성자:관리자</p>
        </div>
        <div className={styles.written_data}>
          <p>작성일:{post.createdAt}</p>
        </div>
        <div>
          <p>조회수: {post.views}</p>
        </div>
        <div className={styles.btn}>
          <div className={styles.written_btn}>
            <button>수정</button>
          </div>
          <div className={styles.written_btn}>
            <button>삭제</button>
          </div>
        </div>
      </div>
      <div>{post.summary}</div>
    </div>
  );
}

export default DisasterLIstItem;
