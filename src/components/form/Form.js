import React from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, TextField } from "@mui/material";
import CryptoJS from "crypto-js";

function Form({ title, getDataForm, firebaseError, inputName1, type2, type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = ({ name, password }) => {
    const changePassword = CryptoJS.SHA256(password).toString();
    getDataForm(name, changePassword);
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
        type="password"
        label={"비밀번호 (숫자+영문자+특수문자 8자리 이상)"}
        autoComplete="off"
        {...register("password", userPassword)}
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
