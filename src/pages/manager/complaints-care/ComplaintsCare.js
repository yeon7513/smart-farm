import React from "react";
import { TbReportSearch } from "react-icons/tb";
import SearchBox from "../../../components/search_box/SearchBox";
import styles from "./ComplaintsCare.module.scss";

function ComplaintsCare() {
  return (
    <div className={styles.complaints}>
      <SearchBox name={<TbReportSearch />} placeholder={"신고 검색"} />
      <div className={styles.header}>
        <div className={styles.state}>
          <div>
            <button>처리중</button>
            <button>처리완료</button>
          </div>
        </div>
        <div className={styles.category}>
          <div>
            <button>전체</button>
            <button>프로필</button>
            <button>게시글</button>
            <button>댓글</button>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div>
          <p className={styles.profile}>프로필</p>
          <p className={styles.post}>게시글</p>
          <p className={styles.comment}>댓글</p>
        </div>
      </div>
    </div>
  );
}

export default ComplaintsCare;
