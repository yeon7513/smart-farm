import React, { useEffect, useRef, useState } from "react";
import { GrPowerReset } from "react-icons/gr";
import styles from "./HomeChart.module.scss";
import RenderingChart from "../chart/RenderingChart";
import { GridLoader } from "react-spinners";
import {
  fetchEntireRegion,
  fetchLocalRegion,
} from "../../store/usage-status/usageStatusSlice";
import { useDispatch, useSelector } from "react-redux";
import { chartTypes } from "../chart/Charts";
import Maps from "../map/Maps";
import { HiMiniCheck } from "react-icons/hi2";

function HomeChart() {
  const { entireRegion, localRegion, isLoading } = useSelector(
    (state) => state.usageStatusSlice
  );
  const dispatch = useDispatch();

  const [chartType, setChartType] = useState("bar");
  const [sort, setSort] = useState("local");
  const [localName, setLocalName] = useState("");
  const [localFarm, setLocalFarm] = useState(null);
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  const handleLocalClick = (name) => {
    setLocalName(name);
    // if (mapRef.current && mapRef.current.resetMap) {
    //   mapRef.current.resetMap();
    // }
  };

  // 조회별 렌더링
  const handleSortClick = (sort) => {
    setSort(sort);
    setLocalFarm(null);
  };

  // 데이터 불러오기
  useEffect(() => {
    dispatch(fetchEntireRegion(sort));
  }, [dispatch, sort]);

  useEffect(() => {
    dispatch(fetchLocalRegion(sort));
  }, [dispatch, sort]);

  // 상세 지역 필터링 후 저장
  useEffect(() => {
    const filteredData = localRegion.find((local) => local.local === localName);

    if (!filteredData) {
      return;
    } else {
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

  return (
    <div className={styles.map_chart}>
      <div>
        <Maps
          className={styles.map}
          onRegionClick={handleLocalClick}
          ref={mapRef}
          userLocation={userLocation}
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
                  {/* <div className={styles.select}>
                  {chartTypes.map((type, idx) => (
                    <SelectChartType
                      key={idx}
                      {...type}
                      type={chartType}
                      handleChange={handleChangeChartType}
                    />
                  ))}
                </div> */}
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
                  {/* <div className={styles.select}>
                    {chartTypes.map((type, idx) => (
                      <SelectChartType
                        key={idx}
                        {...type}
                        type={chartType}
                        handleChange={handleChangeChartType}
                      />
                    ))}
                  </div> */}
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
