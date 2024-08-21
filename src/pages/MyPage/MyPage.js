import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./MyPage.module.scss";

const userInfo = JSON.parse(localStorage.getItem("users"));

function MyPage() {
  return (
    <div className={styles.myPage}>
      <h1>마이페이지</h1>
      <form>
        <div className={styles.formGroup}>
          <label>주소</label>
          <input type="text" name="address" />
        </div>
        <div className={styles.formGroup}>
          <label>전화번호</label>
          <input type="text" name="phone" />
        </div>
        <div className={styles.formGroup}>
          <label>비밀번호</label>
          <input type="password" name="password" />
        </div>
        <button type="submit" className={styles.updateButton}>
          정보 수정
        </button>
      </form>

      <div className={styles.myPageButtons}>
        <button className={styles.manageFarmButton}>농장 관리창</button>
        <button className={styles.deleteAccountButton}>회원탈퇴</button>
      </div>
    </div>
  );
}

export default MyPage;
