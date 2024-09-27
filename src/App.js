import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

import Home from "./pages/home/Home";
import Info from "./pages/info/Info";

import DiseasesItem from "./pages/info/diseases/diseases-item/DiseasesItem";

import PostView from "./components/board/post-view/PostView";
import CommunityMenu from "./context/CommunityMenu";
import DashboardMenu from "./context/DashboardMenu";
import InfoMenu from "./context/InfoMenu";
import ManagerMenu from "./context/ManagerMenu";
import MyPageMenu from "./context/MyPageMenu";
import { SectorProvider } from "./context/SectorContext";
import KaKaoLogin from "./pages/LoginPage/KaKaoLogin";
import PaymentDetail from "./pages/MyPage/payment/PaymentDetail";
import DisasterLIstItem from "./pages/info/disaster/disaster-list/disaster-list-item/DisasterLIstItem";
import DisasterPost from "./pages/info/disaster/disasterpost/DisasterPost";
import Manager from "./pages/manager/Manager";
import MyFarm from "./pages/my-farm/MyFarm";
import FarmList from "./pages/my-farm/my-farm-list/FarmList";
import DashBoard from "./pages/my-farm/my-farm-list/dashboard/DashBoard";
import NotFound from "./pages/notFound/NotFound";
import RequestForQuote from "./pages/request/RequestForQuote";
import "./scss/global.scss";
import DisasterEdit from "./pages/info/disaster/disasteredit/DisasterEdit";
import Faq from "./pages/community/faq/Faq";
import FaqModify from "./pages/community/faq/FaqModify";

function App() {
  return (
    <BrowserRouter>
      <ComponentProvider>
        <Routes>
          {/* 전체 레이아웃 구조 */}
          <Route path="/" element={<Layout />}>
            {/* <Route path="test" element={<Userout />} /> */}
            {/* 홈 (메인) */}
            <Route index element={<Home />} />
            {/* 소개 */}
            <Route path="about">
              <Route index element={<About />} />
              <Route path="service" element={<Service />} />
              {/* <Route path="counsel" element={<Counsel />} /> */}
            </Route>
            {/* 정보 */}
            <Route path="info" element={<Info />}>
              <Route index element={<InfoMenu />} />
              <Route path="diseases/:path" element={<DiseasesItem />} />
              <Route path="disaster/:id" element={<DisasterLIstItem />} />
              <Route path="disaster/write" element={<DisasterPost />} />
              <Route path="disaster/edit/:docId" element={<DisasterEdit />} />
            </Route>
            {/* 로그인 */}
            <Route path="login" element={<LoginPage />} />
            {/* 회원가입 */}
            <Route path="register" element={<RegisterPage />} />
            <Route path="SearchEm" element={<SearchEm />} />
            <Route path="SearchPw" element={<SearchPw />} />
            {/* 견적의뢰 */}
            <Route path="request" element={<RequestForQuote />} />
            <Route path="oauth/kakao" element={<KaKaoLogin />} />
            {/* 커뮤니티 */}
            <Route path="community" element={<Community />}>
              <Route index element={<CommunityMenu />} />
              <Route path=":collection/:id" element={<PostView />} />
              <Route path="faq" element={<Faq />}>
                <Route path=":id" element={<FaqModify />} />
              </Route>
            </Route>
            {/* 내 농장 관리 */}
            <Route path="my-farm" element={<MyFarm />}>
              <Route index element={<FarmList />} />
            </Route>
            {/* 관리자 */}
            <Route path="manager" element={<Manager />}>
              <Route index element={<ManagerMenu />} />
            </Route>
            {/* 마이페이지 */}
            <Route path="/Mypage" element={<MyPage />}>
              <Route index element={<MyPageMenu />} />
              <Route path=":paymentsDocId" element={<PaymentDetail />} />
            </Route>
          </Route>
          {/* 대시보드 */}
          <Route
            path="/my-farm/:id"
            element={
              <SectorProvider>
                <DashBoard />
              </SectorProvider>
            }
          >
            <Route index element={<DashboardMenu />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ComponentProvider>
    </BrowserRouter>
  );
}

export default App;
