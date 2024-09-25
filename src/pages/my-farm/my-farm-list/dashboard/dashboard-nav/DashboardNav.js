import React, { useEffect, useState } from "react";
import { useComponentContext } from "../../../../../context/ComponentContext";
import styles from "./DashboardNav.module.scss";
import { useSelector } from "react-redux";
import { LoginGetDatas } from "../../../../../api/userPage";

function DashboardNav() {
  const { currComp, setCurrComp } = useComponentContext();
  const [state, setState] = useState();
  const { dashboardAlertContent } = useSelector((state) => state.controlSlice);
  return (
    <ul className={styles.nav}>
      <li>
        <button
          className={currComp === "Briefing" ? styles.active : ""}
          onClick={() => setCurrComp("Briefing")}
        >
          메인
        </button>
      </li>
      <li>
        <button
          className={currComp === "Monitoring" ? styles.active : ""}
          onClick={() => setCurrComp("Monitoring")}
        >
          모니터링
        </button>
      </li>
      <li>
        <button
          className={currComp === "ControlBox" ? styles.active : ""}
          onClick={() => setCurrComp("ControlBox")}
        >
          컨트롤
        </button>
      </li>
      <li>
        <button
          className={currComp === "Sensor" ? styles.active : ""}
          onClick={() => setCurrComp("Sensor")}
        >
          센서
        </button>
      </li>
      <li>
        <button
          className={currComp === "Alert" ? styles.active : ""}
          onClick={() => setCurrComp("Alert")}
        >
          <span>알림 내역</span>
          <span className={styles.length}>
            [{dashboardAlertContent?.length}]
          </span>
        </button>
      </li>
      <li>
        <button
          className={currComp === "Report" ? styles.active : ""}
          onClick={() => setCurrComp("Report")}
        >
          보고서
        </button>
      </li>
    </ul>
  );
}

export default DashboardNav;
