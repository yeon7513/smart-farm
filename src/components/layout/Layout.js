import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import { getUserAuth } from "../../api/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Layout() {
  const auth = getUserAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleLogout = () => {
    auth.signOut();
  };
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
