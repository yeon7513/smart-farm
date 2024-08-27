import React from "react";
import style from "./Myinfo.module.scss";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";

function Myinfo(props) {
  return (
    <div className={styles.container}>
      <div className={style.headers}>
        <div>프로필 사진</div>
        <input className={style.header} type="text" />
        <div>닉네임</div>
        <div className={style.name}>
          <input className={style.header} type="text" />
          <button>중복확인</button>
        </div>
        <div>비밀번호 변경</div>
        <input className={style.header} type="text" />
        <div>집 주소</div>
        <input className={style.header} type="text" />
        <button className={style.header}>프로필 변경</button>
      </div>
    </div>
  );
}

export default Myinfo;
