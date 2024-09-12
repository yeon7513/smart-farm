import React from "react";
import styles from "./Form.module.scss";
import { useForm } from "react-hook-form";
import { Box, Button, FormControl, TextField } from "@mui/material";
import CryptoJS from "crypto-js";

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
  const onSubmit = ({ name, password, email }) => {
    const changePassword = CryptoJS.SHA256(password).toString();
    getDataForm(name, changePassword, email);
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
