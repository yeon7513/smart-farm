import React from "react";
import Sidebar from "../../components/Mypage/Sidebar";
import { Outlet } from "react-router-dom";
import Myinfo from "../../components/Mypage/Myinfo";

function MyPage(props) {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default MyPage;
