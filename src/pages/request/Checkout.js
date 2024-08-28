import React from "react";
import styles from "./Checkout.module.scss";

function Checkout({ description, onClick }) {
  return (
    <div>
      <button className={styles.submit} onClick={onClick}>
        {description}
      </button>
    </div>
  );
}

export default Checkout;
