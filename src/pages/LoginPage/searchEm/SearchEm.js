import React, { useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import Container from "../../../components/layout/container/Container";
import styles from "./SearchEm.module.scss";
import { TextField } from "@mui/material";
// import { fetchItems } from "../../../store/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";

function SearchEm(props) {
  const [state, setState] = useState([new Set()]);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.userSlice);
  useEffect(() => {
    // dispatch(fetchItems({ collectionName: "users" }));
  }, []);

  const handleInputNum = async (name, password) => {
    const resultData = items.filter((item) => {
      return item.name === name && item.password === password;
    });
    resultData.forEach((item) => {
      setState(item);
    });
  };
  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        <h1>이메일 찾기</h1>
      </div>
      <Form
        getDataForm={handleInputNum}
        title={"이메일 찾기"}
        inputName1={"이름"}
        type={"text"}
        type2={"name"}
      />
      <TextField
        className={styles.answer}
        disabled
        label={`회원님의 email은 : ${
          state.email === undefined ? "email" : state.email
        } 입니다.`}
      />
    </Container>
  );
}

export default SearchEm;
