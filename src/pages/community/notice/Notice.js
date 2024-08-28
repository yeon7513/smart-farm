import React, { useEffect, useState } from "react";
import Board from "../../../components/board/Board";
import { notice } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";
import styles from "../community.module.scss";
import { useComponentContext } from "../../../context/ComponentContext";

function Notice() {
  const [state, setState] = useState(false);
  const { currComp, setCurrComp } = useComponentContext(); // setCurrComp 함수를 가져옵니다.

  // currComp 상태 초기화
  useEffect(() => {
    return () => {
      setCurrComp(null);
    };
  }, [setCurrComp]);

  return (
    <div>
      <h2 className={styles.community}>공지사항</h2>
      <p>- 게시판 규칙, 업데이트 소식 등을 안내해드립니다.</p>
      <div>
        {currComp ? <PostView /> : <Board items={notice} nopost={state} />}
      </div>
    </div>
  );
}

export default Notice;
