import React from "react";
import Disaster from "../pages/info/disaster/Disaster";
import Diseases from "../pages/info/diseases/Diseases";
import Simulation from "../pages/info/simulation/Simulation";
import UsageStatus from "../pages/info/usage-status/UsageStatus";
import { useComponentContext } from "./ComponentContext";

function InfoMenu() {
  // 정보 메뉴
  const { currComp } = useComponentContext();

  switch (currComp) {
    case "UsageStatus":
      return <UsageStatus />;
    case "Simulation":
      return <Simulation />;
    case "Diseases":
      return <Diseases />;
    case "Disaster":
      return <Disaster />;

    default:
      return <UsageStatus />;
  }
}

export default InfoMenu;
