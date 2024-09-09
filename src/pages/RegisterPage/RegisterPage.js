import React from "react";
import Button from "@mui/material/Button";

import { Link, Navigate, useNavigate } from "react-router-dom";
import { getUserAuth, joinUser } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/UserSlice";
import SignUp from "./sign-up/SignUp";
import style from "./RegisterPage.module.scss";
import Container from "./../../components/layout/container/Container";

function RegisterPage(props) {
  return (
    <Container>
      <h1>회원가입</h1>
      <SignUp />
      <p>
        이미 계정이 있습니까? &nbsp; <Link to={"/login"}>로그인</Link>
      </p>
    </Container>
  );
}

export default RegisterPage;
