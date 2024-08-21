import React from 'react';
import { Outlet } from 'react-router-dom';
import Contact from '../contact/Contact';
import Footer from './footer/Footer';
import Header from './header/Header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Contact />
      <Footer />
    </>
  );
}

export default Layout;
