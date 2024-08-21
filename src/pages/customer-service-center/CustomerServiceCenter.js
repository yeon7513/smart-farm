import React from "react";
import styles from "./CustomerServiceCenter.module.scss";
import RequestForQuote from "./RequestForQuote";
import Faq from "./Faq";

function CustomerServiceCenter() {
  return (
    <div>
      <h1>견적 의뢰서</h1>
      <RequestForQuote />
      <h1>FAQ</h1>
      <div className={styles.page}>
        <div>
          <Faq />
        </div>
      </div>
    </div>
  );
}

export default CustomerServiceCenter;
