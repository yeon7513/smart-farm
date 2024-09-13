import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Contact from './../contact/Contact';
import UpButton from './../up-button/UpButton';
import Footer from './footer/Footer';
import Header from './header/Header';
import styles from './Layout.module.scss';

function Layout() {
  const [isResponsive, setIsResponsive] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 768) {
        setIsResponsive(false);
      } else {
        setIsResponsive(true);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isResponsive]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Contact className={styles.layoutContact} isResponsive={isResponsive} />
      <UpButton />
      <Footer />
    </>
  );
}

export default Layout;
