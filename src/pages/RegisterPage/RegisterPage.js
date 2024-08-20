import React from "react";
import Button from "@mui/material/Button";
import {
  Avatar,
  Box,
  Container,
  createTheme,
  FormControl,
  Grid,
  styled,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import { purple, teal } from "@mui/material/colors";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { getUserAuth, joinUser } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user/UserSlice";
import SignUp from "./sign-up/SignUp";

function RegisterPage(props) {
  // const auth = getUserAuth();
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const handleClick = async (email, password) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );
  //     const { user } = userCredential;
  //     await joinUser(user.uid, user.email);
  //     dispatch(
  //       setUser({
  //         email: user.email,
  //         token: user.refreshToken,
  //         uid: user.uid,
  //       })
  //     );
  //     Navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm({});

  // const onSubmit = ({ email, password }) => {
  //   handleClick(email, password);
  //   reset();
  //   console.log(email, password);
  // };
  // const userEmail = {
  //   required: "필수 필드입니다.",
  // };

  // const userPassword = {
  //   required: "필수 필드입니다.",
  //   minLength: {
  //     value: 6,
  //     message: "최소 8자 입니다.",
  //   },
  // };

  return (
    <div>
      <div>
        <h1>회원가입</h1>
        <SignUp />
        <p>
          이미 계정이 있습니까? &nbsp; <Link to={"/login"}>로그인</Link>
        </p>
      </div>
    </div>
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     sx={{
    //       mt: 8,
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
    //     <Avatar
    //       sx={{
    //         m: 1,
    //         backgroundColor: "skyblue",
    //         width: "60px",
    //         height: "60px",
    //         display: "flex",
    //         justifyContent: "center",
    //         alignItems: "center",
    //       }}
    //     />
    //     <Typography component="h1" variant="h5">
    //       회원가입
    //     </Typography>
    //     <Box component="form" sx={{ mt: 3 }}>
    //       <FormControl onSubmit={handleSubmit(onSubmit)} component="fieldset">
    //         <Grid container spacing={2}>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               autoFocus
    //               fullWidth
    //               type="email"
    //               name="email"
    //               id="email"
    //               label="이메일 주소"
    //               //   {...register("email", userEmail)}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               type="password"
    //               name="password"
    //               id="password"
    //               label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
    //               //   {...register("password", userPassword)}
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               type="password"
    //               name="rePassword"
    //               id="rePassword"
    //               label="비밀번호 재입력"
    //               //   {...register("password", userPassword)}
    //             />
    //           </Grid>
    //         </Grid>
    //         <Button
    //           onClick={handleClick}
    //           type="submit"
    //           fullWidth
    //           variant="contained"
    //           sx={{ mt: 3, mb: 2 }}
    //           size="large"
    //         >
    //           회원가입
    //         </Button>
    //       </FormControl>
    //     </Box>
    //   </Box>
    // </Container>
  );
}

export default RegisterPage;
