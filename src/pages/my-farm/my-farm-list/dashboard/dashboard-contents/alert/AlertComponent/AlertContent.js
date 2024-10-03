import React from "react";
import styles from "../Alert.module.scss";
import { dashboardAlertIcon } from "../../../../../../../utils/dashboardAlert";

function AlertContent({ item }) {
  function formatData(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  }

  return (
    <div className={styles.content}>
      <h2>{formatData(item.createdAt)}</h2>
      <div className={styles.harvest}>
        <span>{dashboardAlertIcon(item.gb)}</span>
        <button> {item.content}</button>
      </div>
    </div>
  );
}

export default AlertContent;
