import React from "react";
import styles from "./DisasterListItem.module.scss";
import { useLocation } from "react-router-dom";

function DisasterLIstItem(props) {
  const location = useLocation();
  const { post } = location.state || {};

  if (!post) {
    return <p>Post data not available</p>;
  }
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
