import React, { useEffect, useState } from "react";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import style from "./Myletter.module.scss";
import Board from "../../board/Board";
import { Mypost } from "../../../lib/post";
import { dispatch } from "d3";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBoardDatas,
  filterMyPosts,
} from "../../../store/board/boardSlice";

function Myletter() {
  const loginUser = JSON.parse(localStorage.getItem("user"));

  const [state, setState] = useState(false);

  const dispatch = useDispatch();
  const { myPosts } = useSelector((state) => state.boardSlice);

  useEffect(() => {
    // 게시물 데이터 로드
    dispatch(fetchBoardDatas("sharing"));
  }, [dispatch]);

  useEffect(() => {
    // 로그인된 사용자의 게시물만 필터링
    if (loginUser) {
      dispatch(filterMyPosts(loginUser));
    }
  }, [loginUser, dispatch]);

  return (
    <Container className={style.container}>
      <div className={style.main}>
        <div>내가 쓴 글</div>

        <Board category={"sharing"} nopost={state} mtPosts={myPosts} />
      </div>
    </Container>
  );
}

export default Myletter;
