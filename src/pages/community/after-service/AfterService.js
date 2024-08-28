import React, { useEffect, useState } from "react";
import Board from "../../../components/board/Board";
import { as } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";
import Post from "../../../components/board/post/Post";
import styles from "../community.module.scss";
import { useComponentContext } from "../../../context/ComponentContext";

function AfterService(props) {
  const { currComp, setCurrComp } = useComponentContext();

  // currComp 상태 초기화
  useEffect(() => {
    return () => {
      setCurrComp(null);
    };
  }, []);

  return (
    <div>
      <h2 className={styles.community}>A/S 문의</h2>
      <p>
        - 아이팜 서비스 이용 중 문의사항이 있다면 게시판 또는 상담전화, 챗봇
        등을 이용해보세요.
      </p>
      <div>{currComp ? <PostView /> : <Board items={as} />}</div>
    </div>
  );
}

export default AfterService;
