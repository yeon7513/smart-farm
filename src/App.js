import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import SearchEm from "./pages/LoginPage/searchEm/SearchEm";
import SearchPw from "./pages/LoginPage/searchPw/SearchPw";
import MyPage from "./pages/MyPage/MyPage";
import MyPayment from "./pages/MyPayment/MyPayment";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import About from "./pages/about/About";
import Service from "./pages/about/Service";
import Community from "./pages/community/Community";
import AfterService from "./pages/community/after-service/AfterService";
import Faq from "./pages/community/faq/Faq";
import Notice from "./pages/community/notice/Notice";
import SharingInformation from "./pages/community/sharing-information/SharingInformation";
import RequestForQuote from "./pages/request/RequestForQuote";
import Home from "./pages/home/Home";
import Info from "./pages/info/Info";
import Disaster from "./pages/info/disaster/Disaster";
import Diseases from "./pages/info/diseases/Diseases";
import Simulation from "./pages/info/simulation/Simulation";
import UsageStatus from "./pages/info/usage-status/UsageStatus";
import MyFarm from "./pages/my-farm/MyFarm";
import FarmList from "./pages/my-farm/my-farm-list/FarmList";
import DashBoard from "./pages/my-farm/my-farm-list/dashboard/DashBoard";
import "./scss/global.scss";
<<<<<<< HEAD
import DiseasesItem from "./pages/info/diseases/diseases-item/DiseasesItem";
import DiseasesList from "./pages/info/diseases/diseases-list/DiseasesList";
=======
import Myinfo from "./components/Mypage/Myinfo";
import Sidebar from "./components/Mypage/Sidebar";
>>>>>>> 80376b098324fd9197a9e4bb621a505f553a8954

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about">
            <Route index element={<About />} />
            <Route path="service" element={<Service />} />
            {/* <Route path="counsel" element={<Counsel />} /> */}
          </Route>
          <Route path="info" element={<Info />}>
            <Route index element={<Navigate to="usage-status" />} />
            <Route path="usage-status" element={<UsageStatus />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="diseases" element={<Diseases />}>
              <Route index element={<DiseasesList />} />
              <Route path=":path" element={<DiseasesItem />} />
            </Route>
            <Route path="disaster" element={<Disaster />} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="MyPage" element={<MyPage />}>
            <Route index element={<Myinfo />} />
            {/* <Route path="register" element={<RegisterPage />} /> */}
          </Route>
          <Route path="SearchEm" element={<SearchEm />} />
          <Route path="SearchPw" element={<SearchPw />} />
          <Route path="MyPayment" element={<MyPayment />} />
          <Route path="request" element={<RequestForQuote />} />
          <Route path="community" element={<Community />}>
            <Route index element={<Navigate to="notice" />} />
            <Route path="notice" element={<Notice />} />
            <Route path="faq" element={<Faq />} />
            <Route
              path="sharing-information"
              element={<SharingInformation />}
            />
            <Route path="after-service" element={<AfterService />} />
          </Route>
          <Route path="request" element={<RequestForQuote />} />
          <Route path="my-farm" element={<MyFarm />}>
            <Route index element={<FarmList />} />
          </Route>
        </Route>
        <Route path="/my-farm/:id" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
