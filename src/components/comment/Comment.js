import React from "react";
import styles from "./Comment.module.scss";

function Comment() {
  return (
    <div className={styles.comment}>
      <h2>댓글(2개)</h2>
      <div>
        <h4>금방 해결 도와드리겠습니다.</h4>
        <p>
          관리자 <span>2024-08-26</span>
        </p>
      </div>
      <div>
        <h4>네 해결됐네요~ 감사합니다.</h4>
        <p>
          짱구농장 <span>2024-08-26</span>
        </p>
      </div>
    </div>
  );
}

export default Comment;
