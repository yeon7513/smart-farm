import React from "react";
import styles from "./Counsel.module.scss";
function Counsel(props) {
  return (
    <div className={styles.counsel}>
      <div className={styles.input}>
        <input type="text" />
        <button>찾기</button>
      </div>
      <div className={styles.list}>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    </div>
  );
}

export default Counsel;
