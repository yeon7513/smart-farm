import React from "react";
import Form from "../../../components/form/Form";
import Container from "../../../components/layout/container/Container";
import styles from "./SearchEm.module.scss";
import { TextField } from "@mui/material";

function SearchEm(props) {
  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        <h1>이메일 찾기</h1>
      </div>
      <Form title={"이메일 찾기"} inputName1={"이름"} />
      <TextField
        className={styles.answer}
        disabled
        // label={`회원님의 email은:${email == true ? email : ""} 입니다.`}
      />
    </Container>
  );
}

export default SearchEm;
