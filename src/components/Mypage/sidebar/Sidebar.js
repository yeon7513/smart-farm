import React from "react";
import styles from "./sidebar.module.scss";
import { Link } from "react-router-dom";
function Sidebar(props) {
  return (
    <div className={styles.container}>
      <ul className={styles.items}>
        내 정보
        <li className={styles.item}>
          <Link to="Myinfo">내 정보 수정</Link>
        </li>
        <li className={styles.itemmove}>
          <Link to="/my-farm">내 농장 관리</Link>
        </li>
      </ul>
      <ul className={styles.items}>
        결제 내역
        <li className={styles.item}>
          <Link to="Paymentinfo">결재 내역 조회</Link>
        </li>
      </ul>
      <ul className={styles.items}>
        문의 내역
        <li className={styles.item}>
          <Link to="Chatbotinfo">챗봇 상담</Link>
        </li>
        <li className={styles.item}>
          <Link to="Asinfo">A/S 문의</Link>
        </li>
        <li className={styles.item}>
          <Link to="Myletter">내가 쓴 글</Link>
        </li>
      </ul>
      <ul className={styles.items}>
        <Link>회원 탈퇴</Link>
      </ul>
    </div>
  );
}

export default Sidebar;
