import React from "react";
import Sidebar from "../../components/Mypage/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Myinfo from "../../components/Mypage/myinfo/Myinfo";
import Container from "../../components/layout/container/Container";

function MyPage(props) {
  return (
    <Container>
      <Sidebar />
      <Outlet />
    </Container>
  );
}

export default MyPage;
