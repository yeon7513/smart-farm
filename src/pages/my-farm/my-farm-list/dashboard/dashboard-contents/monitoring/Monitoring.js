import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import { chatData } from "./chartData/chartdata";
import RenderingChart from "../../../../../../components/chart/RenderingChart";

function Monitoring() {
  const dispatch = useDispatch();
  const [farmState, setFarmState] = useState("");
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [chartType, setChartType] = useState("line");
  console.log(growthData);
  return (
    <div>
      <span>Monitoring</span>
      <Outlet />
      <RenderingChart chartType={chartType} data={chatData} />
    </div>
  );
}

export default Monitoring;
