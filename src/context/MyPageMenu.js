import React from "react";
import { useComponentContext } from "./ComponentContext";
import Myinfo from "../components/Mypage/myinfo/Myinfo";
import MyFarm from "../pages/my-farm/MyFarm";
import Payment from "../components/Mypage/payment/Payment";
import Chatbot from "../components/Mypage/chatbot/Chatbot";
import Asinfo from "../components/Mypage/asinfo/Asinfo";
import Myletter from "../components/Mypage/myletter/Myletter";
import Userout from "../components/Mypage/userout/Userout";
import Mymain from "./../components/Mypage/mymain/Mymain";

function MyPageMenu(props) {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case "Myinfo":
      return <Myinfo />;
    case "my-farm":
      return <MyFarm />;
    case "Paymentinfo":
      return <Payment />;
    case "Chatbotinfo":
      return <Chatbot />;
    case "Asinfo":
      return <Asinfo />;
    case "Myletter":
      return <Myletter />;
    case "Userout":
      return <Userout />;
    default:
      return <Mymain />;
  }
}

export default MyPageMenu;
