import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommonInfo } from "../../../store/dashboard/dashboardSlice";
import { fetchItems } from "../../../store/user/UserSlice";
import styles from "./OverallStatus.module.scss";
import AccumulatedStatus from "./status-chart/AccumulatedStatus";
import NewStatus from "./status-chart/NewStatus";

function OverallStatus() {
  const { items, isLoading: userLoading } = useSelector(
    (state) => state.userSlice
  );
  const { commonInfo, isLoading: dashboardLoading } = useSelector(
    (state) => state.dashboardSlice
  );

  const dispatch = useDispatch();

  const filteredData = (data) => {
    if (!data || data.length === 0) return [];

    return data
      .filter((item) => item.deleteYn === "N")
      .reduce((acc, item) => {
        const date = new Date(item.createdAt).toLocaleDateString();
        const exist = acc.find((entry) => entry.name === date);

        if (exist) {
          exist.value += 1;
        } else {
          acc.push({ name: date, value: 1 });
        }
        return acc;
      }, []);
  };

  // 신규 데이터
  const getNewChartData = (changeData) => {
    if (userLoading || dashboardLoading) return [];

    if (changeData === "all") {
      const allDataMap = new Map();

      filteredData(items).forEach((entry) => {
        const date = entry.name;
        if (!allDataMap.has(date)) {
          allDataMap.set(date, { name: date, user: 0, dashboard: 0 });
        }
        allDataMap.get(date).user += entry.value;
      });

      filteredData(commonInfo).forEach((entry) => {
        const date = entry.name;
        if (!allDataMap.has(date)) {
          allDataMap.set(date, { name: date, user: 0, dashboard: 0 });
        }
        allDataMap.get(date).dashboard += entry.value;
      });

      return Array.from(allDataMap.values())
        .sort((a, b) => new Date(a.name) - new Date(b.name))
        .map((arr) => ({
          name: new Date(arr.name).toLocaleDateString(),
          user: arr.user,
          dashboard: arr.dashboard,
        }));
    } else if (changeData === "users") {
      return filteredData(items)
        .sort((a, b) => new Date(a.name) - new Date(b.name))
        .map((item) => ({
          ...item,
          name: item.name,
        }));
    } else if (changeData === "dashboard") {
      return filteredData(commonInfo)
        .sort((a, b) => new Date(a.name) - new Date(b.name))
        .map((item) => ({
          ...item,
          name: item.name,
        }));
    }
  };

  // 누적 데이터
  const getAccumulatedChartData = (changeData) => {
    if (userLoading || dashboardLoading) return [];

    if (changeData === "all") {
      const allDataMap = new Map();

      filteredData(items).forEach((entry) => {
        const date = entry.name;
        if (!allDataMap.has(date)) {
          allDataMap.set(date, { name: date, user: 0, dashboard: 0 });
        }
        allDataMap.get(date).user += entry.value;
      });

      filteredData(commonInfo).forEach((entry) => {
        const date = entry.name;
        if (!allDataMap.has(date)) {
          allDataMap.set(date, { name: date, user: 0, dashboard: 0 });
        }
        allDataMap.get(date).dashboard += entry.value;
      });

      let cumulativeUser = 0;
      let cumulativeDashboard = 0;

      return Array.from(allDataMap.values())
        .sort((a, b) => new Date(a.name) - new Date(b.name))
        .map((entry) => {
          cumulativeUser += entry.user;
          cumulativeDashboard += entry.dashboard;
          return {
            name: new Date(entry.name).toLocaleDateString(),
            user: cumulativeUser,
            dashboard: cumulativeDashboard,
          };
        });
    } else if (changeData === "users") {
      let cumulativeUser = 0;
      return filteredData(items)
        .sort((a, b) => new Date(a.name) - new Date(b.name))
        .map((item) => {
          cumulativeUser += item.value;
          return {
            name: item.name,
            value: cumulativeUser,
          };
        });
    } else if (changeData === "dashboard") {
      let cumulativeDashboard = 0;
      return filteredData(commonInfo)
        .sort((a, b) => new Date(a.name) - new Date(b.name))
        .map((item) => {
          cumulativeDashboard += item.value;
          return {
            name: item.name,
            value: cumulativeDashboard,
          };
        });
    }
  };

  useEffect(() => {
    dispatch(fetchItems({ collectionName: "users" }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCommonInfo("dashboard"));
  }, [dispatch]);

  return (
    <div className={styles.overall}>
      <NewStatus data={getNewChartData} />
      <AccumulatedStatus data={getAccumulatedChartData} />
    </div>
  );
}

export default OverallStatus;
