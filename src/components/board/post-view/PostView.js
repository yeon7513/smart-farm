import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PostView.module.scss";
import { getBoardDatas } from "../../../api/firebase/board";

function PostView() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <h2>{post.title}</h2>
        </div>
        <div>
          <div>
            <p>작성자: {post.userId}</p>
            <p>작성일: {post.createAt}</p>
            <p>조회수: {post.count}</p>
          </div>
          <div>
            <button>🚨 신고하기</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>{post.summary}</div>
        {/* <div>{currComp.imgUrl}</div> */}
      </div>
      <div className={styles.comment}>
        <h2>댓글(2개)</h2>
        <div>
          <h4>{post.comment}</h4>
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
      <div className={styles.input}>
        <input />
        <button>댓글달기</button>
      </div>

      <div className={styles.back}>
        <button onClick={() => navigate(-1)}>목록으로</button>
      </div>
    </div>
  );
}

export default PostView;
