import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../container/Container';
import styles from './Header.module.scss';
import Nav from './nav/Nav';

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const { pathname } = useLocation();

  const headerScrollRef = useRef();

  useEffect(() => {
    ScrollTrigger.create({
      trigger: headerScrollRef.current,
      start: '900vh top+=100vh',
      end: 'bottom top',
      onEnter: () => headerScrollRef.current.classList.add(styles.scrolled),
      onLeaveBack: () =>
        headerScrollRef.current.classList.remove(styles.scrolled),
    });
  }, []);

  return (
    <header
      className={pathname === '/' ? styles.home : ''}
      ref={headerScrollRef}
    >
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
