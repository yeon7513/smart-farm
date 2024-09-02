import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./PostView.module.scss";
import { getBoardDatas } from "../../../api/firebase/board";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Complain from "../../complain/Complain";

function PostView() {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { state } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <h2>{state.title}</h2>
        </div>
        <div>
          <div>
            <p>작성자: {state.userId}</p>
            <p>작성일: {state.createAt}</p>
            <p>조회수: {state.count}</p>
          </div>
          <div>
            <button>🚨 신고하기</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>{state.summary}</div>
        <div>{state.imgUrl}</div>
      </div>
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
      <div className={styles.input}>
        <input />
        <button>댓글달기</button>
      </div>
      <div className={styles.back}>
        <button onClick={() => navigate(-1)}>목록으로</button>
      </div>
      게시글
      {}
    </div>
  );
}

export default PostView;
