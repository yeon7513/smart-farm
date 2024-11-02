import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../store/user/UserSlice";
import styles from "./Form.module.scss";

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

  const { items } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, []);
  const onSubmit = ({ name, password, email }) => {
    const findUser = items.find((item) => {
      return item.email === name;
    });
    if (findUser?.deleteYn === "Y") {
      alert("탈퇴된 회원입니다.");
      return false;
    }

    getDataForm(name, password, email);
    reset();
  };
  const userEmail = {
    required: "필수 필드입니다.",
  };

  // const userPassword = {
  //   pattern: {
  //     value:
  //       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //     message:
  //       "대문자, 소문자, 숫자, 특수 문자를 포함한 최소 8자 이상이어야 합니다.",
  //   },
  // };

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
