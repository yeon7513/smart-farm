import React from "react";
import styles from "./Checkout.module.scss";

function Checkout({
  description,
  userEmail,
  date,
  farmAddress,
  facilityType,
  additionalOptions,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      userEmail,
      date,
      farmAddress,
      facilityType,
      additionalOptions,
    });
  };

  return (
    <div>
      <button className={styles.submit} onSubmit={handleSubmit}>
        {description}
      </button>
    </div>
  );
}

export default Checkout;
