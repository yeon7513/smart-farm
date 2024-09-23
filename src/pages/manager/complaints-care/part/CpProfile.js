import React from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";

function CpProfile({ item }) {
  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.profile}>
          <img src={item.profileUrl} alt="" />
          <h3>{item.defendant}</h3>
        </div>
        <div className={styles.care}>
          <p>신고사유: {item.reasonName}</p>
          <p>신고자: {item.complainant} </p>
          <div>
            <button>승인</button>
            <button>거부</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CpProfile;
