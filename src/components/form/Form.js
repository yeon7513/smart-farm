import React, { useState } from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, TextField } from "@mui/material";
import { useSelector } from "react-redux";

function Form({
  title,
  getDataForm,
  firebaseError,
  inputName1,
  inputName2,
  type2,
  type,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  // const [secretPassword, setSecretPassword] = useState();

  // const CryptoJS = require("crypto-js");
  // // 암호화에 사용할 키를 정의합니다. 실제로는 더 안전한 키 관리가 필요합니다.
  // const encryptionKey = "mySecretKey123"; // 비밀번호를 안전하게 관리하기 위해 실제 환경에서는 더욱 복잡한 키를 사용해야 합니다.
  // const iv = CryptoJS.lib.WordArray.random(128 / 8); // 초기화 벡터 (IV) 생성
  // // 비밀번호를 암호화합니다.
  // function encryptPassword(password) {
  //   const encrypted = CryptoJS.AES.encrypt(password, encryptionKey, {
  //     iv: iv,
  //   }).toString();
  //   setSecretPassword(encrypted);
  //   return encrypted;
  // }
  const { items } = useSelector((state) => state.userSlice);
  const onSubmit = ({ name, password, email }) => {
    console.log(name);
    // encryptPassword(password);
    const findUser = items.find((item) => {
      return item.email == name;
    });
    if (findUser.deleteYn == "Y") {
      return false;
    }

    getDataForm(name, password, email);
    reset();
  };
  const userEmail = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자 이상.",
    },
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <TextField
        InputProps={{
          sx: {
            pl: 2,
            pr: 2,
          },
        }}
        type={type}
        label={inputName1}
        autoComplete="off"
        {...register("name", userEmail)}
      />

      {errors?.email && (
        <div>
          <span className={styles.form_error}>{errors.email.message}</span>
        </div>
      )}

      <TextField
        InputProps={{
          sx: {
            pl: 2,
            pr: 2,
          },
        }}
        type={type2}
        label={inputName2}
        autoComplete="off"
        {...register(type2)}
      />
      {errors?.password && (
        <div>
          <span className={styles.form_error}>{errors.password.message}</span>
        </div>
      )}

      <button>{title}</button>
      {firebaseError && <span className={styles.form_error}>에러메세지</span>}
    </form>
  );
}

export default Form;
