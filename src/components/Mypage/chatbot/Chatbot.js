import React, { useState } from "react";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import style from "./Chatbot.module.scss";
import Board from "../../board/Board";
import { chatBot } from "./../../../lib/post";

function Chatbot(props) {
  const [state, setState] = useState(false);
  return (
    <Container className={style.container}>
      <div className={style.main}>
        <div>상담내역</div>
        <Board items={chatBot} mypage={state} />
      </div>
    </Container>
  );
}

export default Chatbot;
