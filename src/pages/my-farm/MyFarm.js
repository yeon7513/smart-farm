import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "../../components/layout/container/Container";
import styles from "./MyFarm.module.scss";
import { useComponentContext } from "../../context/ComponentContext";
import FarmList from "./my-farm-list/FarmList";

function MyFarm() {
  const { currComp } = useComponentContext();
  const location = useLocation();
  return (
    <Container className={styles.myFarm}>
      <div className={styles.map}>지도가 들어갈 예정입니다.</div>

      <div className={styles.content}>
        <Outlet />
        {currComp && location.pathname !== "/my-farm" ? (
          <Link to="details">
            <FarmList />
          </Link>
        ) : null}
      </div>
    </Container>
  );
}

export default MyFarm;
