import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyPage from "./pages/MyPage/MyPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import About from "./pages/about/About";
import Service from "./pages/about/Service";
import CustomerServiceCenter from "./pages/customer-service-center/CustomerServiceCenter";
import Home from "./pages/home/Home";
import Simulation from "./pages/simulation/Simulation";
import Detail from "./pages/simulation/details/Detail";
import "./scss/global.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about">
            <Route index element={<About />} />
            <Route path="service" element={<Service />} />
          </Route>
          <Route path="simulation" element={<Simulation />}>
            <Route path=":id" element={<Detail />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route
            path="customer-service-center"
            element={<CustomerServiceCenter />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
