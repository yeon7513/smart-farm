import React from "react";
import AfterService from "../pages/community/after-service/AfterService";
import Notice from "../pages/community/notice/Notice";
import SharingInformation from "../pages/community/sharing-information/SharingInformation";
import Faq from "./../pages/community/faq/Faq";
import { useComponentContext } from "./ComponentContext";

function CommunityMenu() {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case "Notice":
      return <Notice />;
    case "Faq":
      return <Faq />;
    case "SharingInformation":
      return <SharingInformation />;
    case "AfterService":
      return <AfterService />;

    default:
      return <Notice />;
  }
}

export default CommunityMenu;
