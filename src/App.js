import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Asinfo from "./components/Mypage/asinfo/Asinfo";
import Chatbot from "./components/Mypage/chatbot/Chatbot";
import Myletter from "./components/Mypage/myletter/Myletter";
import Payment from "./components/Mypage/payment/Payment";
import Layout from "./components/layout/Layout";
import { ComponentProvider } from "./context/ComponentContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import SearchEm from "./pages/LoginPage/searchEm/SearchEm";
import SearchPw from "./pages/LoginPage/searchPw/SearchPw";
import MyPage from "./pages/MyPage/MyPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import About from "./pages/about/About";
import Service from "./pages/about/Service";
import Community from "./pages/community/Community";
import AfterService from "./pages/community/after-service/AfterService";
import Faq from "./pages/community/faq/Faq";
import Notice from "./pages/community/notice/Notice";
import SharingInformation from "./pages/community/sharing-information/SharingInformation";
import Home from "./pages/home/Home";
import Info from "./pages/info/Info";
import Disaster from "./pages/info/disaster/Disaster";
import Diseases from "./pages/info/diseases/Diseases";
import DiseasesItem from "./pages/info/diseases/diseases-item/DiseasesItem";
import DiseasesList from "./pages/info/diseases/diseases-list/DiseasesList";
import Simulation from "./pages/info/simulation/Simulation";
import UsageStatus from "./pages/info/usage-status/UsageStatus";
import Manager from "./pages/manager/Manager";
import FarmList from "./pages/my-farm/my-farm-list/FarmList";
import DashBoard from "./pages/my-farm/my-farm-list/dashboard/DashBoard";
import RenderingMenu from "./pages/my-farm/my-farm-list/dashboard/RenderingMenu";
import RequestForQuote from "./pages/request/RequestForQuote";
import "./scss/global.scss";
import MyFarm from "./pages/my-farm/MyFarm";
import Myinfo from "./components/Mypage/myinfo/Myinfo";
import Mymain from "./components/Mypage/mymain/Mymain";
import Userout from "./components/Mypage/userout/Userout";
import Alert from "./components/Mypage/userout/Alert";

function App() {
  return (
    <BrowserRouter>
      <ComponentProvider>
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
            <Route path="SearchEm" element={<SearchEm />} />
            <Route path="SearchPw" element={<SearchPw />} />
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
              {/* <Route path="after-service:id" element={<PostView />} /> */}
            </Route>
            <Route path="my-farm" element={<MyFarm />}>
              <Route index element={<FarmList />} />
            </Route>
            <Route path="manager" element={<Manager />} />

            {/* 관리자 */}
            <Route path="MyPage" element={<MyPage />}>
              <Route index element={<Mymain />} />
              <Route path="Myinfo" element={<Myinfo />} />
              <Route path="Chatbotinfo" element={<Chatbot />} />
              <Route path="Paymentinfo" element={<Payment />} />
              <Route path="Asinfo" element={<Asinfo />} />
              <Route path="Myletter" element={<Myletter />} />
              <Route path="Userout" element={<Userout />} />
            </Route>
          </Route>
          <Route path="Alert" element={<Alert />} />
          <Route path="/my-farm/:id" element={<DashBoard />}>
            <Route index element={<RenderingMenu />} />
          </Route>
        </Routes>
      </ComponentProvider>
    </BrowserRouter>
  );
}

export default App;
