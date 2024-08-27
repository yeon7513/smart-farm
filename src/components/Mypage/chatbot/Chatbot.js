import React from "react";
import styles from "./Chatbot.module.scss";
import Container from "../../layout/container/Container";

function Chatbot(props) {
  return (
    <Container className={styles.container}>
      <div>
        <div>상담내역</div>
        <div>챗봇 상담내역</div>
      </div>
    </Container>
  );
}

export default Chatbot;
