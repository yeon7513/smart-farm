import React from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";

function CpPost() {
  return (
    <>
      <p>게시글</p>
      <section>
        <div className={styles.flex_box}>
          <div className={styles.post}>
            <div className={styles.title}>
              <h2>ㅋㅏ지No 넘버원</h2>
              <div>
                <img src={ex} alt="" />
                <h4>1등</h4>
              </div>
            </div>
            <div>
              <h3>이거 완전 대박.. 농사 지을 필요가 없음</h3>
            </div>
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

export default CpPost;
