import React from "react";
import { Link } from "react-router-dom";
import SignUp from "./sign-up/SignUp";
import style from "./RegisterPage.module.scss";
import Container from "./../../components/layout/container/Container";

function RegisterPage(props) {
  return (
    <Container className={style.container}>
      <div>
        <h1>회원가입</h1>
      </div>
      <SignUp />
      <p>
        이미 계정이 있습니까? &nbsp; <Link to={"/login"}>로그인</Link>
      </p>
    </Container>
  );
}

export default RegisterPage;
