import React from "react";
import styles from "../ComplaintsCare.module.scss";

function CpComment() {
  return (
    <>
      <p>댓글</p>
      <section>
        <div className={styles.flex_box}>
          <div className={styles.comment}>
            <h3>우웩 완전 별로 ㅡㅡ</h3>
            <h4>유진이</h4>
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
        <div className={styles.flex_box}>
          <div className={styles.comment}>
            <h3>메롱메롱 약오르지</h3>
            <h4>djowjfo</h4>
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

export default CpComment;
