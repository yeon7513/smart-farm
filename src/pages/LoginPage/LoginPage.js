import React from "react";
import SignIn from "./sign-in/SignIn";
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
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { cyan, purple, teal } from "@mui/material/colors";
import * as FcIcons from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { getUserAuth, joinUser } from "../../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function LoginPage(props) {
  const auth = getUserAuth();
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
  const navigate = useNavigate();
  const SignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await joinUser(user.uid, user.email);
    await signInWithPopup(auth, provider).then((result) => {
      navigate("/");
    });
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    navigate("/");
    return null;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const theme = createTheme({
    palette: {
      primary: {
        light: "#757ce8",
        main: "#3f50b5",
        dark: "#002884",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ff7961",
        main: cyan[200],
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              backgroundColor: "skyblue",
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    name="email"
                    id="email"
                    label="이메일 주소"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    name="password"
                    id="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
              <Button
                type="submit"
                sx={{ bgcolor: "secondary.main" }}
                onClick={SignInWithGoogle}
              >
                <FcIcons.FcGoogle />
                <span>
                  <b>Google</b>
                </span>
              </Button>
              <p>
                ID 찾기 | 비밀번호 찾기 &nbsp;
                <Link to="/register">회원가입</Link>
              </p>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
