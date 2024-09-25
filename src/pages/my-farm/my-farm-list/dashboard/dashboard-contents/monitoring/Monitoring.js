import React from "react";
import { Outlet } from "react-router-dom";
import { useSectorContext } from "../../../../../../context/SectorContext";
import { transformDataForBarGraphs } from "./../../../../../../components/chart/Charts";

function Monitoring() {
  const { sector } = useSectorContext();
  return (
    <div>
      <span>Monitoring</span>

      <Outlet />
    </div>
  );
}

export default Monitoring;
