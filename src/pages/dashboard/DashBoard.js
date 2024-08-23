import React from "react";
import styles from "./DashBoard.module.scss";

function DashBoard(props) {
  return (
    <div className={styles.main}>
      <div>
        <h2>온도</h2>
      </div>
      <div>
        <h2>습도</h2>
      </div>
    </div>
  );
}

export default DashBoard;
