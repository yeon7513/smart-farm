import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SearchEm from "./pages/LoginPage/searchEm/SearchEm";
import SearchPw from "./pages/LoginPage/searchPw/SearchPw";
import MyPage from "./pages/MyPage/MyPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import About from "./pages/about/About";
import Service from "./pages/about/Service";
import Faq from "./pages/customer-service-center/Faq";
import RequestForQuote from "./pages/customer-service-center/RequestForQuote";
import Home from "./pages/home/Home";
import Info from "./pages/info/Info";
import Simulation from "./pages/info/simulation/Simulation";
import UsageStatus from "./pages/info/usage-status/UsageStatus";
import "./scss/global.scss";

function App() {
  const url =
    "/api/Agree_WS/webservices/ProvideRestService/getIdentityDataList/cbd181f0a2594233a01eed9b0b86a392";
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log(result.slice(0, 10));
    });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about">
            <Route index element={<About />} />
            <Route path="service" element={<Service />} />
          </Route>
          <Route path="info" element={<Info />}>
            <Route index element={<Navigate to="usage-status" />} />
            <Route path="usage-status" element={<UsageStatus />} />
            <Route path="simulation" element={<Simulation />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route path="SearchEm" element={<SearchEm />} />
          <Route path="SearchPw" element={<SearchPw />} />
          <Route path="MyPage" element={<MyPage />} />
          <Route path="customer-service-center" element={<Outlet />}>
            <Route index element={<Navigate to="faq" replace />} />
            <Route path="request" element={<RequestForQuote />} />
            <Route path="faq" element={<Faq />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
