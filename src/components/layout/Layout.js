import React from 'react';
import { Outlet } from 'react-router-dom';
import Contact from '../contact/Contact';
import UpButton from './../up-button/UpButton';
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
      <UpButton />
      <Footer />
    </>
  );
}

export default Layout;
