import {
  Avatar,
  Box,
  Button,
  createTheme,
  FormControl,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Container from "../../layout/container/Container";
import { teal } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../api/firebase";
import { setUser } from "../../../store/user/UserSlice";

function Mymain(props) {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const Navigate = useNavigate();
  const ButtonClick = () => {
    Navigate("/mypage/Myinfo");
  };
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
        main: teal[500],
        dark: "#ba000d",
        contrastText: "#000",
      },
    },
  });

  // 전화번호 포맷 변환 및 마스킹 함수
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";
    const parts = phoneNumber.split("-");
    if (parts.length === 3) {
      const areaCode = parts[0];
      const firstPart = parts[1].slice(0, 2) + "**";
      const secondPart = parts[2].slice(0, 2) + "**";
      return `+82 ${areaCode.slice(1)}-${firstPart}-${secondPart}`;
    }
    return phoneNumber;
  };

  // 이메일 주소 마스킹 처리 함수
  const maskEmail = (email) => {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    const [domainName, domainExt] = domain.split(".");

    const maskedLocalPart = localPart.slice(0, 2) + "**";
    const maskedDomainName = domainName.slice(0, 2) + "**";

    return `${maskedLocalPart}@${maskedDomainName}.${domainExt}`;
  };

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
              m: 3,
              backgroundColor: "secondary.main",
              width: "70px",
              height: "70px",
            }}
          />
          <Typography component="h1" variant="h5">
            {user.name}
          </Typography>
          <Typography>
            Phone:{" "}
            {formatPhoneNumber(user.number) || "전화번호 정보가 없습니다."}
          </Typography>
          <Typography>
            Mail: {maskEmail(user.email) || "이메일 정보가 없습니다."}{" "}
          </Typography>
          <Typography>
            address: {user.address || "주소 정보가 없습니다."}{" "}
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
              onClick={ButtonClick}
            >
              내 정보 수정하기
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Mymain;
