import React from "react";
import styles from "./Checkout.module.scss";

function Checkout({ type, description, onClick }) {
  return (
    <div>
      <button className={styles.submit} type={type} onClick={onClick}>
        {description}
      </button>
    </div>
  );
}

export default Checkout;
