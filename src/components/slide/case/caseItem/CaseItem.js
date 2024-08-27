import React from "react";
import styles from "./CaseItem.module.scss";

function CaseItem({ img, why, name, content }) {
  return (
    <div className={styles.caseItem}>
      <img src={img} alt={name} />
      <h2>{why}</h2>
      <h3>{name}</h3>
      <p>{content}</p>
    </div>
  );
}

export default CaseItem;
