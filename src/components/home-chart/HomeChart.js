import * as d3 from "d3";
import React, { useEffect, useState } from "react";
import { HiMiniCheck } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import {
  fetchEntireRegion,
  fetchLocalRegion,
} from "../../store/usage-status/usageStatusSlice";
import RenderingChart from "../chart/RenderingChart";
import Maps from "../map/Maps";
import styles from "./HomeChart.module.scss";

function HomeChart() {
  const { entireRegion, localRegion, isLoading } = useSelector(
    (state) => state.usageStatusSlice
  );
  const dispatch = useDispatch();

  const [chartType, setChartType] = useState("bar");
  const [sort, setSort] = useState("local");
  const [localName, setLocalName] = useState("");
  const [localFarm, setLocalFarm] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(true); // 사용자 위치 표시 여부

  const handleLocalClick = (name) => {
    setLocalName(name);
    setShowUserLocation(false); // 사용자가 클릭하면 사용자 위치 숨기기
  };

  // 조회별 렌더링
  const handleSortClick = (sort) => {
    setSort(sort);
    setLocalFarm(null);
  };

  // 데이터 불러오기
  useEffect(() => {
    dispatch(fetchEntireRegion(sort));
    dispatch(fetchLocalRegion(sort));
  }, [dispatch, sort]);

  // 상세 지역 필터링 후 저장
  useEffect(() => {
    const filteredData = localRegion.find((local) => local.local === localName);
    if (filteredData) {
      setLocalFarm(filteredData.data);
    }
  }, [localRegion, localName]);

  useEffect(() => {
    if (localFarm) {
      setChartType("bar");
    }
  }, [localFarm]);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          console.error("위치 정보를 가져오는 데 실패했습니다:", error);
        }
      );
    }
  }, []);

  // 사용자 위치 지역 클릭
  useEffect(() => {
    if (userLocation) {
      const closestRegion = localRegion.find((local) =>
        d3.geoContains(local.geometry, [
          userLocation.longitude,
          userLocation.latitude,
        ])
      );

      if (closestRegion) {
        handleLocalClick(closestRegion.local); // 지역 클릭 처리
      }
    }
  }, [userLocation, localRegion]);

  return (
    <div className={styles.map_chart}>
      <div>
        <Maps
          className={styles.map}
          onRegionClick={handleLocalClick}
          userLocation={showUserLocation ? userLocation : null} // 사용자 위치를 조건에 따라 전달
        />
      </div>
      <div>
        <div className={styles.sortBtns}>
          <button
            className={sort === "local" ? styles.active : ""}
            onClick={() => handleSortClick("local")}
          >
            <HiMiniCheck />
            지역별
          </button>
          <button
            className={sort === "crop" ? styles.active : ""}
            onClick={() => handleSortClick("crop")}
          >
            <HiMiniCheck />
            작물별
          </button>
        </div>
        <div className={styles.content}>
          {!localFarm ? (
            <div className={styles.entrie}>
              {isLoading ? (
                <GridLoader color="#a2ca71" margin={5} size={20} />
              ) : (
                <>
                  <h2>
                    {sort === "local" ? "스마트팜" : "작물별"} 전체 이용 현황
                  </h2>
                  <div className={styles.chart}>
                    <RenderingChart chartType={chartType} data={entireRegion} />
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.local}>
              {isLoading ? (
                <GridLoader color="#a2ca71" margin={5} size={20} />
              ) : (
                <>
                  <h2>
                    {sort === "local" ? "스마트팜" : "작물별"} 상세 이용 현황
                  </h2>
                  <div className={styles.chart}>
                    <RenderingChart chartType={chartType} data={localFarm} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeChart;
