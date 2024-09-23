import React from 'react';
import IntroMyPage from '../pages/MyPage/intro-my-page/IntroMyPage';
import MyChatbot from '../pages/MyPage/my-chatbot/MyChatbot';
import Myinfo from '../pages/MyPage/myinfo/Myinfo';
import Payment from '../pages/MyPage/payment/Payment';
import { useComponentContext } from './ComponentContext';

function MyPageMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'IntroMyPage':
      return <IntroMyPage />;
    case 'Payment':
      return <Payment />;
    case 'Myinfo':
      return <Myinfo />;
    case 'MyChatbot':
      return <MyChatbot />;
    // case 'Asinfo':
    //   return <Asinfo />;
    // case 'Myletter':
    //   return <Myletter />;
    // case 'Userout':
    //   return <Userout />;
    default:
      return <IntroMyPage />;
  }
}

export default MyPageMenu;
