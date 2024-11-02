import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Forms.module.scss";
import { TextField } from "@mui/material";
import SearchAddr from "../search-addr/SearchAddr";

function Forms({ title, getDataForm, firebaseError }) {
  const [state, setState] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = ({ email, password, number, name, nickname }) => {
    getDataForm(email, password, {
      number: number,
      address: state,
      farmAddress: [],
      name: name,
      nickname: nickname,
      deleteYn: "N",
      complaneNum: "",
    });
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };

  const number = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      message:
        "대문자, 소문자, 숫자, 특수 문자를 포함한 최소 8자 이상이어야 합니다.",
    },
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          fullWidth
          InputProps={{
            sx: {
              pl: 2,
              pr: 2,
            },
          }}
          type="text"
          label={"닉네임"}
          autoComplete="off"
          {...register("nickname")}
        />
      </div>
      <div>
        <TextField
          fullWidth
          InputProps={{
            sx: {
              pl: 2,
              pr: 2,
            },
          }}
          type="text"
          label={"이름"}
          autoComplete="off"
          {...register("name")}
        />
      </div>
      <div>
        <TextField
          fullWidth
          InputProps={{
            sx: {
              pl: 2,
              pr: 2,
            },
          }}
          type="email"
          label={"이메일 입력"}
          autoComplete="off"
          {...register("email", userEmail)}
        />
        {errors?.email && (
          <div>
            <span className={styles.form_error}>{errors.email.message}</span>
          </div>
        )}
      </div>
      <div>
        <TextField
          fullWidth
          InputProps={{
            sx: {
              pl: 2,
              pr: 2,
            },
          }}
          type="password"
          label={"비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)"}
          {...register("password", userPassword)}
        />
        {errors?.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <div>
        <TextField
          fullWidth
          InputProps={{
            sx: {
              pl: 2,
              pr: 2,
            },
          }}
          type="password"
          label={"비밀번호 재입력"}
          {...register("password", userPassword)}
        />
        {errors?.password && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <div>
        <TextField
          fullWidth
          InputProps={{
            sx: {
              pl: 2,
              pr: 2,
            },
          }}
          type="text"
          label={"전화번호"}
          autoComplete="off"
          {...register("number", number)}
        />
        {errors?.number && (
          <div>
            <span className={styles.form_error}>{errors.password.message}</span>
          </div>
        )}
      </div>
      <div>
        <h3>주소</h3>
        <SearchAddr getAddr={setState} />
      </div>

      <button>{title}</button>
      {firebaseError && <span className={styles.form_error}>에러메세지</span>}
    </form>
  );
}

export default Forms;
