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

// import PostView from './components/board/post-view/PostView';
import CommunityMenu from "./context/CommunityMenu";
import InfoMenu from "./context/InfoMenu";
import MyPageMenu from "./context/MyPageMenu";
import Manager from "./pages/manager/Manager";
import MyFarm from "./pages/my-farm/MyFarm";
import FarmList from "./pages/my-farm/my-farm-list/FarmList";
import DashBoard from "./pages/my-farm/my-farm-list/dashboard/DashBoard";
import RenderingMenu from "./pages/my-farm/my-farm-list/dashboard/RenderingMenu";
import RequestForQuote from "./pages/request/RequestForQuote";
import "./scss/global.scss";

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
              <Route index element={<InfoMenu />} />
              <Route path=":path" element={<DiseasesItem />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="SearchEm" element={<SearchEm />} />
            <Route path="SearchPw" element={<SearchPw />} />
            <Route path="request" element={<RequestForQuote />} />
            <Route path="community" element={<Community />}>
              <Route index element={<CommunityMenu />} />
              <Route path=":id" element={<PostView />} />
            </Route>
            <Route path="my-farm" element={<MyFarm />}>
              <Route index element={<FarmList />} />
            </Route>
            <Route path="manager" element={<Manager />} />

            {/* 관리자 */}
            <Route path="/Mypage" element={<MyPage />}>
              <Route index element={<MyPageMenu />} />
            </Route>
          </Route>
          <Route path="/my-farm/:id" element={<DashBoard />}>
            <Route index element={<RenderingMenu />} />
          </Route>
        </Routes>
      </ComponentProvider>
    </BrowserRouter>
  );
}

export default App;
