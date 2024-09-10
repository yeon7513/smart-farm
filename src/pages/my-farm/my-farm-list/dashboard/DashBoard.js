import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Container from "../../../../components/layout/container/Container";
import { fetchCommonInfo } from "../../../../store/dashboard/dashboardSlice";
import DashboardHeader from "./dashboard-header/DashboardHeader";
import DashboardNav from "./dashboard-nav/DashboardNav";
import styles from "./DashBoard.module.scss";

function DashBoard() {
  const { commonInfo } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();

  console.log("commonInfo: ", commonInfo);

  useEffect(() => {
    dispatch(fetchCommonInfo("dashboard"));
  }, [dispatch]);

  return (
    <Container className={styles.wrapper}>
      <div className={styles.dashBoard}>
        <DashboardHeader info={commonInfo} />
        <div className={styles.content}>
          <DashboardNav />
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default DashBoard;
