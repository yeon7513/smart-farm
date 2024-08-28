import React from "react";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import style from "./Asinfo.module.scss";
import Board from "../../board/Board";
import { Aswriter } from "../../../lib/post";

function Asinfo(props) {
  return (
    <Container className={style.container}>
      <div className={style.main}>
        <div>AS 문의 내역</div>
        <Board items={Aswriter} />
      </div>
    </Container>
  );
}

export default Asinfo;
