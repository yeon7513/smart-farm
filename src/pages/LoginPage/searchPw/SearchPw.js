import React, { useEffect, useState } from "react";
import Form from "../../../components/form/Form";
import Container from "../../../components/layout/container/Container";
import { TextField } from "@mui/material";
import styles from "./SearchPw.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../../store/user/UserSlice";
import EmailButton from "./EmailButton";
import CryptoJS from "crypto-js";

function SearchPw(props) {
  const [state, setState] = useState([]);
  const [renderring, setRendering] = useState(false);
  const [isdisabled, setIsDisabled] = useState(false);
  const [temperPassword, setTemperPassword] = useState();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.userSlice);
  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, []);
  const handleInputNum = async (name, password, email) => {
    const resultData = items.filter((item) => {
      return item.name === name && item.email === email;
    });
    resultData.forEach((item) => {
      setState(item);
      setTemperPassword(item.password.slice(0, 10));
    });
    setRendering(true);
  };
  const CryptoJS = require("crypto-js");
  const encryptionKey = "mySecretKey123";
  const iv = CryptoJS.lib.WordArray.random(128 / 8); // 초기화 벡터 (IV) 생성
  const encryptedPassword = state.password;

  // 암호화된 비밀번호를 복호화합니다.
  function decryptPassword(encryptedPassword) {
    const decrypted = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey, {
      iv: iv,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  return (
    <Container className={styles.container}>
      <div className={styles.title}>
        <h1>비밀번호 찾기</h1>
        <h3>
          소셜(Google, Kakao)이 아닌 <span>일반 회원가입</span>만 가능합니다.
        </h3>
      </div>

      <Form
        getDataForm={handleInputNum}
        title={"비밀번호 찾기"}
        inputName1={"이름"}
        inputName2={"이메일 입력"}
        type={"text"}
        type2={"email"}
        user={state}
      />

      <EmailButton
        getDataForm={temperPassword}
        user={state}
        renderring={renderring}
        setIsDisabled={setIsDisabled}
        isdisabled={isdisabled}
      />
      {isdisabled && <div>{decryptPassword(encryptedPassword)}</div>}
    </Container>
  );
}

export default SearchPw;
