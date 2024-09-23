import React from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";

function CpProfile() {
  return (
    <>
      <p>프로필</p>
      <section>
        <div className={styles.flex_box}>
          <div className={styles.profile}>
            <img src={ex} alt="" />
            <h3>닉네임</h3>
          </div>
          <div className={styles.care}>
            <p>신고사유:</p>
            <p>신고자:</p>
            <div>
              <button>승인</button>
              <button>거부</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CpProfile;
