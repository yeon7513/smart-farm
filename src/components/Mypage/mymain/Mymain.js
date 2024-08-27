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
import React from "react";
import Container from "../../layout/container/Container";
import { teal } from "@mui/material/colors";

function Mymain(props) {
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
          <Avatar sx={{ m: 1, backgroundColor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            회원이름
          </Typography>
          <Typography>Phone: +82 10-8***-4***</Typography>
          <Typography>Mail: wj******@h*******.com </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
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
