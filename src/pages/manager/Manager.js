import React from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/layout/container/Container";
import ManagerSidebar from "./manager-sidebar/ManagerSidebar";
// import styles from './Manager.module.scss';

function Manager(props) {
  return (
    <Container>
      <ManagerSidebar />
      <div>
        <Outlet />
      </div>
    </Container>
  );
}

export default Manager;
