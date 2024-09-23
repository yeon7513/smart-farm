import React from "react";
import styles from "../ComplaintsCare.module.scss";
import ex from "../../../../assets/main/logo2.png";
import { Link } from "react-router-dom";

function CpPost({ item }) {
  return (
    <>
      <div className={styles.flex_box}>
        <div className={styles.post}>
          <div className={styles.title}>
            <h2>{item.title}</h2>
            <div>
              <img src={ex} alt="" />
              <h4>{item.defendant}</h4>
            </div>
          </div>
          <div>
            <Link to={`/community/${item.category}/${item.postId}`}>
              <h3>{item.summary}</h3>
            </Link>
          </div>
        </div>
        <div className={styles.care}>
          <p>신고사유: {item.reasonName}</p>
          <p>신고자: {item.complainant}</p>
          <div>
            <button>승인</button>
            <button>거부</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CpPost;
