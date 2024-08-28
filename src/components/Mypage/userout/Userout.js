import React, { useState } from "react";
import Container from "../../layout/container/Container";
import style from "./Userout.module.scss";
import { Link } from "react-router-dom";

function Userout(props) {
  const openPopup = () => {
    // 새로운 창 열기 (URL, 창 이름, 창 속성)
    const newWindow = window.open("", "회원 탈퇴", "width=600,height=400");
    newWindow.document.write(`
        <html>
          <head>
            <title>회원 탈퇴</title>
          </head>
          <body>
            <h1>정말 탈퇴를 하시겠습니까?!</h1>
            <p>탈퇴 시의 지금까지의 모든 정보를 잃게됩니다. </p>
            <button onclick="window.close()">닫기</button>
          </body>
        </html>
      `);
  };
  return (
    <Container className={style.container}>
      <div>
        <div>비밀번호</div>
        <input />
        <button onClick={openPopup}>확인</button>
      </div>
    </Container>
  );
}
export default Userout;
