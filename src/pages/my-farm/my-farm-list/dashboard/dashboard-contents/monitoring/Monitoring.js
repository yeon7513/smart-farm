import React from "react";
import { Outlet } from "react-router-dom";
import { useSectorContext } from "../../../../../../context/SectorContext";
import SimpleLineChart from "../../../../../../components/chart/SimpleLineChart";
import { useSelector } from "react-redux";

function Monitoring() {
  const { growthData } = useSelector((state) => state.bestfarmSlice);

  console.log(growthData);
  const { sector } = useSectorContext();
  return (
    <div>
      <span>Monitoring</span>
      {/* <SimpleLineChart /> */}
      <Outlet />
    </div>
  );
}

export default Monitoring;
