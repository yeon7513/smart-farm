import React from "react";
import styles from "./Service.module.scss";
import smtImg from "../../assets/abou/스마트팜.png";
function Service(props) {
  return (
    <div>
      <div className={styles.farm}>
        <div>
          <img src={styles.smtImg} />
        </div>
      </div>
    </div>
  );
}

export default Service;
