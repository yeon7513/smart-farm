import cn from 'classnames';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from '../container/Container';
import styles from './Header.module.scss';
import Nav from './nav/Nav';

gsap.registerPlugin(ScrollTrigger);

function Header() {
  const { pathname } = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const headerScrollRef = useRef();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 768) {
        setMenuOpen(false);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (headerScrollRef.current) {
      ScrollTrigger.create({
        trigger: headerScrollRef.current,
        start: '900vh top+=100vh',
        end: 'bottom top',
        onEnter: () => headerScrollRef.current.classList.add(styles.scrolled),
        onLeaveBack: () =>
          headerScrollRef.current.classList.remove(styles.scrolled),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <header
      className={
        pathname === '/' ? cn(styles.header, styles.home) : styles.header
      }
      ref={headerScrollRef}
    >
      <Container className={styles.container}>
        <h1 className={styles.logo}>
          <Link to="/" state="home">
            <img className={styles.logoIcon} src="./img/logo.png" alt="" />
            아이팜
          </Link>
        </h1>
        <Nav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <button
          className={
            menuOpen ? cn(styles.hamBtn, styles.active) : styles.hamBtn
          }
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </Container>
    </header>
  );
}

export default Header;
