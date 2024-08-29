import React from "react";
import { useComponentContext } from "./ComponentContext";
import Notice from "../pages/community/notice/Notice";
import AfterService from "../pages/community/after-service/AfterService";
import SharingInformation from "../pages/community/sharing-information/SharingInformation";
import Faq from "./../pages/community/faq/Faq";

function CommunityMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case "Notice":
      return <Notice />;
    case "FAQ":
      return <Faq />;
    case "SharingInformation":
      return <SharingInformation />;
    case "As":
      return <AfterService />;

    default:
      return <Notice />;
  }
}

export default CommunityMenu;
