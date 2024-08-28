import React from "react";
import styles from "./sidebar.module.scss";
import { Link } from "react-router-dom";
import { deleteDatas } from "../../../api/firebase";
function Sidebar(props) {
  const handleDelete = async (docId) => {
    alert("정말 회원 탈퇴 하시겠습니까?");
    // localStorage에 저장되어 있는 회원 정보를 삭제합니다.
    localStorage.removeItem("user");
    // Firebase에 "users" 컬렉션에 저장되어 있는 회원 정보를 삭제합니다.
    const result = await deleteDatas("users", docId);

    if (!result) {
      alert("회원 정보가 없습니다. \n 관리자에게 문의하세요.");
      return false;
    }
  };
  return (
    <div className={styles.container}>
      <ul className={styles.items}>
        내 정보
        <li className={styles.item}>
          {/* <button onClick={() => setCurrComp("Myinfo")}>내 정보 수정</button> */}
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
        <Link to="Userout">회원 탈퇴</Link>
      </ul>
    </div>
  );
}

export default Sidebar;
{
  /* <div className={styles.nav}>
  <ul>
    <li className={currComp === "Monitoring" ? styles.active : ""}>
      <button onClick={() => setCurrComp("Monitoring")}>모니터링</button>
    </li>
    <li className={currComp === "ControlBox" ? styles.active : ""}>
      <button onClick={() => setCurrComp("ControlBox")}>컨트롤</button>
    </li>
    <li className={currComp === "Sensor" ? styles.active : ""}>
      <button onClick={() => setCurrComp("Sensor")}>센서</button>
    </li>
    <li className={currComp === "Alert" ? styles.active : ""}>
      <button onClick={() => setCurrComp("Alert")}>알림 내역</button>
    </li>
    <li className={currComp === "Report" ? styles.active : ""}>
      <button onClick={() => setCurrComp("Report")}>보고서</button>
    </li>
  </ul>
</div>; */
}
