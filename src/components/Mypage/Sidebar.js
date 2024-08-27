import React from "react";
import styles from "./sidebar.module.scss";
import { Link } from "react-router-dom";
function Sidebar(props) {
  return (
    <>
      <div className={styles.container}>
        <ul className={styles.items}>
          내 정보
          <li className={styles.item}>
            <Link to="Myinfo">수정</Link>
          </li>
          <li className={styles.item}>
            <Link>내 농장 관리</Link>
          </li>
        </ul>
        <ul className={styles.items}>
          결제 내역
          <li className={styles.item}>
            <Link>결재 내역 조회</Link>
          </li>
        </ul>
        <ul className={styles.items}>
          문의 내역
          <li className={styles.item}>
            <Link>챗봇 상담</Link>
          </li>
          <li className={styles.item}>
            <Link>A/S 문의</Link>
          </li>
          <li className={styles.item}>
            <Link>내가 쓴 글</Link>
          </li>
        </ul>
        <ul className={styles.items}>
          <Link>회원 탈퇴</Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
