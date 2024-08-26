import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "../container/Container";
import styles from "./Header.module.scss";
import Nav from "./nav/Nav";

function Header() {
  const { pathname } = useLocation();

  return (
    <header className={pathname === "/" ? styles.home : ""}>
      <Container className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/" state="home">
            <img
              className="logo-icon"
              // src={require('../../../assets/main/logo.png')}
              alt=""
            />
            아이팜
          </Link>
        </h1>
        <Nav />
      </Container>
    </header>
  );
}

export default Header;
