import React from "react";
import { Link } from "react-router-dom";
import Manager_Sidebar from "./manager-sidebar/Manager_Sidebar";

function Manager(props) {
  return (
    <div>
      관리자 페이지
      <Manager_Sidebar />
    </div>
  );
}

export default Manager;
