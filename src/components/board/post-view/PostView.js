import React from "react";
import styles from "./PostView.module.scss";
// import { useNavigate } from "react-router-dom";
import { useComponentContext } from "../../../context/ComponentContext";

function PostView() {
  // const navigate = useNavigate();s
  const { currComp, setCurrComp } = useComponentContext();
  const BackToBoard = () => setCurrComp(null);

  if (!currComp) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div>
          <h2>{currComp.title}</h2>
        </div>
        <div>
          <div>
            <p>작성자</p>
            <p>작성일</p>
            <p>조회수</p>
          </div>
          <div>
            <button>🚨 신고하기</button>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div>내용</div>
        <div>사진</div>
      </div>
      <div className={styles.comment}>
        <h2>댓글(0개)</h2>
        <div>
          <h4>해결 도와드리겠습니다.</h4>
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
        <button onClick={BackToBoard}>목록으로</button>
      </div>
    </div>
  );
}

export default PostView;
