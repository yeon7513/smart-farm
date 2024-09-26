import React from 'react';
import AfterServiceCare from '../pages/manager/after-service-care/AfterServiceCare';
import ComplaintsCare from '../pages/manager/complaints-care/ComplaintsCare';
import OverallStatus from '../pages/manager/overall-status/OverallStatus';
import ChatRoomCare from '../pages/manager/chat-room-care/ChatRoomCare';
import MembersCare from './../pages/manager/members-care/MembersCare';
import QuotationsCare from './../pages/manager/quotations-care/QuotationsCare';
import { useComponentContext } from './ComponentContext';


function ManagerMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case 'OverallStatus':
      return <OverallStatus />;
    case 'MembersCare':
      return <MembersCare />;
    case 'QuotationsCare':
      return <QuotationsCare />;
    case 'ComplaintsCare':
      return <ComplaintsCare />;
    case 'AfterServiceCare':
      return <AfterServiceCare />;
    case 'ChatRoomCare':
      return <ChatRoomCare />;

    default:
      return <OverallStatus />;
  }
}

export default ManagerMenu;
