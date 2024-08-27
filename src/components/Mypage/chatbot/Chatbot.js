import React from "react";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";
import style from "./Chatbot.module.scss";

function Chatbot(props) {
  return (
    <Container className={style.container}>
      <div className={style.chatbot}>
        <div>상담내역</div>
        <div className={style.chattingBox}>
          <div className={style.chatting}>챗봇 상담내역1</div>
          <div className={style.chatting}>챗봇 상담내역2</div>
          <div className={style.chatting}>챗봇 상담내역3</div>
          <div className={style.chatting}>챗봇 상담내역4</div>
          <div className={style.chatting}>챗봇 상담내역5</div>
          <div className={style.chatting}>챗봇 상담내역6</div>
          <div className={style.chatting}>챗봇 상담내역7</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
          <div className={style.chatting}>챗봇 상담내역8</div>
        </div>
      </div>
    </Container>
  );
}

export default Chatbot;
