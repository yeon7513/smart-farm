import React from "react";
import styles from "./pageContent.module.scss";
import { Link } from "react-router-dom";

function PageContent() {
  return (
    <div className={styles.pageContainer}>
      <h2>마이 페이지</h2>

      <ul><Link to="/">기본 정보</Link></ul>
      <li>주소</li>
      <li>전화번호</li>
      <li>비밀번호</li>

      <ul>주문 내역</ul>
      <li>서비스 예약 내역</li>

      <ul>취소/교환/환불</ul>
      <li>취소/교환/환불 내역</li>
      <li>환불 예정 금액</li>

     
      <ul>나의 1:1 문의 내역</ul>
      <li>챗봇 문의 내역 조회</li>
    </div>
  );
}

export default PageContent;
