import React from "react";
import style from "./Myfarm.module.scss";
import styles from "../MypageGrobal.module.scss";
import Container from "../../layout/container/Container";

function Myfarm(props) {
  return (
    <Container className={styles.container}>
      <div className={style.headers}>내 농장으로 가자!</div>
    </Container>
  );
}

export default Myfarm;
