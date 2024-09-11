import React from "react";
import styles from "./Checkout.module.scss";

function Checkout({ type, description, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  return (
    <div>
      <button className={styles.submit} type={type} onClick={handleClick}>
        {description}
      </button>
    </div>
  );
}

export default Checkout;
