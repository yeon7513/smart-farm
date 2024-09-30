import React from "react";
import InfoEdit from "../pages/MyPage/info-edit/InfoEdit";
import IntroMyPage from "../pages/MyPage/intro-my-page/IntroMyPage";
import MYChatRoom from "../pages/MyPage/my-chat-room/MYChatRoom";
import Payment from "../pages/MyPage/payment/Payment";
import Userout from "./../pages/MyPage/userout/Userout";
import { useComponentContext } from "./ComponentContext";

function MyPageMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case "IntroMyPage":
      return <IntroMyPage />;
    case "Payment":
      return <Payment />;
    case "InfoEdit":
      return <InfoEdit />;
    case "MyChatRoom":
      return <MYChatRoom />;
    case "Userout":
      return <Userout />;
    default:
      return <IntroMyPage />;
  }
}

export default MyPageMenu;
