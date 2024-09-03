import React from "react";
import { Outlet } from "react-router-dom";
import Container from "../../components/layout/container/Container";
import ManagerSidebar from "./manager-sidebar/ManagerSidebar";
import styles from "../manager/manager.module.scss";

function Manager(props) {
  return (
    <Container className={styles.container}>
      <ManagerSidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </Container>
  );
}

export default Manager;
