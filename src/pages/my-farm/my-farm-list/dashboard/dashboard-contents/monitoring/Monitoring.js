import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";

function Monitoring() {
  const dispatch = useDispatch();
  const [farmState, setFarmState] = useState("");
  const { growthData } = useSelector((state) => state.bestfarmSlice);

  useEffect(() => {
    dispatch(fetchGrowthData(`pageSize=10&searchFrmhsCode=${farmState}`));
  }, [dispatch, farmState]);

  useEffect(() => {
    console.log(growthData);
  }, []);
  return (
    <div>
      <span>Monitoring</span>
      <Outlet />
      {/* <RenderingChart /> */}
    </div>
  );
}
// ** 차트 사용법
//  - 데이터 모양
//    -> const data = [ {name: 'string', value: number}, {name: 'string', value: number}, ... ];
export default Monitoring;
