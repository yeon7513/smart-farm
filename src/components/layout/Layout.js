import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      {user ? <button onClick={handleLogout}>로그아웃</button> : ""}
    </>
  );
}

export default Layout;
