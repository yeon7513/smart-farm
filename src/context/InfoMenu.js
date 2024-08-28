import React from "react";
import { useComponentContext } from "./ComponentContext";
import UsageStatus from "../pages/info/usage-status/UsageStatus";
import Simulation from "../pages/info/simulation/Simulation";
import Diseases from "../pages/info/diseases/Diseases";
import Disaster from "../pages/info/disaster/Disaster";

function InfoMenu(props) {
  const { currComp } = useComponentContext();

  switch (currComp) {
    case "UsageStatus":
      return <UsageStatus />;
    case "Simulation ":
      return <Simulation />;
    case "Diseases":
      return <Diseases />;
    case "Disaster ":
      return <Disaster />;

    default:
      return <UsageStatus />;
  }
}

export default InfoMenu;
