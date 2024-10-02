import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import { chatData } from "./chartData/chartdata";
import RenderingChart from "../../../../../../components/chart/RenderingChart";
function Monitoring() {
  const dispatch = useDispatch();
  const [farmState, setFarmState] = useState("");
  const [farmTopState, setFarmTopState] = useState("");
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [chartType, setChartType] = useState("line");
  useEffect(() => {
    dispatch(fetchGrowthData(`pageSize=30&searchFrmhsCode=${farmState}`));
    setFarmState("43");
  }, [dispatch, farmState]);

  useEffect(() => {
    const growData = growthData?.map((item) => {
      return item.hvstGrupp;
    });
    const onlyData = growData.filter((item) => {
      return item > 11;
    });
    setFarmTopState(onlyData);
  }, []);
  function formatData(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  }
  console.log(new Date().getTime());
  const chatData = [
    {
      name: formatData(new Date().getTime() - 86400000 * 7),
      value: 1,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 6),
      value: 2,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 5),
      value: 3,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 4),
      value: 4,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 3),
      value: 5,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 2),
      value: 6,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime() - 86400000),
      value: 7,
      우수농가: farmTopState,
    },
    {
      name: formatData(new Date().getTime()),
      value: 8,
      우수농가: farmTopState,
    },
  ];

  return (
    <div>
      <span>Monitoring</span>
      <Outlet />
      <RenderingChart chartType={chartType} data={chatData} />
    </div>
  );
}

export default Monitoring;
