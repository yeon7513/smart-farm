import React, { useEffect } from "react";
import Board from "../../../components/board/Board";
import { sharing } from "../../../lib/post";
import PostView from "../../../components/board/post-view/PostView";
import { useComponentContext } from "../../../context/ComponentContext";
import styles from "../community.module.scss";
import { Outlet } from "react-router-dom";

function SharingInformation(props) {
  return (
    <div>
      <h2 className={styles.community}>정보 공유 게시판</h2>
      <p> - 아이팜 회원님들의 정보 공유 게시판입니다.</p>
      <div>
        <Board items={sharing} />
        <Outlet />
      </div>
    </div>
  );
}

export default SharingInformation;
