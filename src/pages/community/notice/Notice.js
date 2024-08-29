import React, { useEffect, useState } from "react";
import Board from "../../../components/board/Board";
import { notice } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";
import styles from "../community.module.scss";
import { useComponentContext } from "../../../context/ComponentContext";
import { useNavigate } from "react-router-dom";

function Notice() {
  const [state, setState] = useState(false);

  return (
    <div>
      <h2 className={styles.community}>공지사항</h2>
      <p>- 게시판 규칙, 업데이트 소식 등을 안내해드립니다.</p>
      <div>
        <Board items={notice} nopost={state} />
      </div>
    </div>
  );
}

export default Notice;
