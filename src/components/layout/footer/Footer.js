import React from 'react';
import { FaFacebook, FaGithub, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../container/Container';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/">
            <img className={styles.logoIcon} src={'./img/logo.png'} alt="" />
            아이팜
          </Link>
        </h1>
        <div className={styles.info}>
          <ul>
            <li>
              <span className={styles.bold}>(주)아이팜</span>
            </li>
            <li>
              <span className={styles.bold}>CEO.</span> 김철수
            </li>
            <li>
              <span className={styles.bold}>Biz.</span> 123-1234-123
            </li>
            <li>
              <span className={styles.bold}>Tel.</span> 010-1234-5678
            </li>
            <li>
              <span className={styles.bold}>Support.</span> admin@ifarm.com
            </li>
          </ul>
        </div>
        <div className={styles.sns}>
          <ul>
            <li>
              <Link to="/">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaGithub />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className={styles.copy}>
        <small>
          Copyright {new Date().getFullYear()}{' '}
          <span className={styles.bold}>아이팜</span> All rights reserved.
        </small>
      </div>
    </footer>
  );
}

export default Footer;
