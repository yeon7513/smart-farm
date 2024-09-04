import React, { useEffect, useState } from "react";
import Board from "../../../components/board/Board";
import { as } from "../../../lib/post";
import styles from "../community.module.scss";
import { Outlet } from "react-router-dom";

function AfterService(props) {
  return (
    <div>
      <h2 className={styles.community}>A/S 문의</h2>
      <p>
        - 아이팜 서비스 이용 중 문의사항이 있다면 게시판 또는 상담전화, 챗봇
        등을 이용해보세요.
      </p>
      <div>
        <Board category={"as"} complain={true} />
        <Outlet />
      </div>
    </div>
  );
}

export default AfterService;
