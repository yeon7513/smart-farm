import React from "react";
import style from "./Myfarm.module.scss";
import styles from "../MypageGrobal.module.scss";
import PageTemplate from "../../layout/page-template/PageTemplate";
import Container from "../../layout/container/Container";

function Myfarm(props) {
  return <Container className={styles.container}>내 농장으로 이동!</Container>;
}

export default Myfarm;
