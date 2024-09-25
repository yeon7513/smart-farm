import React, { useEffect, useState } from "react";
import {
  IoLeaf,
  IoLeafOutline,
  IoWarning,
  IoWarningOutline,
} from "react-icons/io5";
import styles from "./Alert.module.scss";
import { addDatas } from "../../../../../../api/firebase";
import controlSlice, {
  getItems,
} from "../../../../../../store/controlData/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import { dashboardAlert } from "../../../../../../utils/dashboardAlert";

function Alert() {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.controlSlice);
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [realState, setRealState] = useState(false);
  const [fruitNum, setFruitNum] = useState("");
  const [farmCode, setFarmCode] = useState("349");
  const [value, setValue] = useState(0); // 초기 값 설정

  const handleAddAlert = async (option) => {
    const addObj = {
      chechYn: "N",
      content: dashboardAlert(option.content),
      createdAt: new Date().getTime(),
      ct: "dashboard",
      gb: option.gb,
      title: "",
    };
    await addDatas("alert", addObj);
  };

  function formatData(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}.${month}.${day}`;
  }

  const now = new Date();
  const currentHours = now.getMinutes();

  useEffect(() => {
    dispatch(getItems({ collectionName: "alert" }));
    dispatch(fetchGrowthData(`searchFrmhsCode=${farmCode}`));
    const firstThing = growthData?.filter((data) => data.frtstCo > 16);
    firstThing?.map((data) => setFruitNum(data.frtstCo));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount >= 3000) {
          setHasExecuted(false);
          setRealState(false);
          return 0; // 3000에 도달하면 0으로 리셋
        }
        return prevCount + 1; // 그렇지 않으면 1 증가
      });
    }, 1000); // 1초마다 증가

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 해제
  }, []);

  if (count === Math.round(fruitNum) && !hasExecuted) {
    handleAddAlert({ content: "complete", gb: "IoLeaf" });
    setHasExecuted(true); //함수 한 번만 실행하고 종료.
  } else if (count === Math.round(fruitNum * 0.9) && !realState) {
    handleAddAlert({ content: "almost", gb: "IoLeafOutline" });
    setRealState(true);
  }
  console.log(count);
  return (
    <div className={styles.alert}>
      {items.map((item) => {
        if (
          item.ct === "dashboard" &&
          item.gb === "IoLeaf" &&
          item.chechYn === "N"
        ) {
          return (
            <div key={item.docId} className={styles.content}>
              <h2>{formatData(item.createdAt)}</h2>
              <div className={styles.harvest}>
                <span>
                  <IoLeaf />
                </span>
                {item.content}
              </div>
            </div>
          );
        }
      })}
      {items.map((item) => {
        if (
          item.ct === "dashboard" &&
          item.gb === "IoWarning" &&
          item.chechYn === "N"
        ) {
          return (
            <div key={item.docId} className={styles.content}>
              <h2>{formatData(item.createdAt)}</h2>
              <div className={styles.warning}>
                <span>
                  <IoWarning />
                </span>
                해당 지역에 병해충이 유행 중입니다!!
              </div>
            </div>
          );
        }
      })}

      {items.map((item) => {
        if (
          item.ct === "dashboard" &&
          item.gb === "IoLeafOutline" &&
          item.chechYn === "N"
        ) {
          return (
            <div key={item.docId} className={styles.content}>
              <h2>{formatData(item.createdAt)}</h2>
              <div className={styles.harvest}>
                <span>
                  <IoLeafOutline />
                </span>
                {item.content}
              </div>
            </div>
          );
        }
      })}
      {items.map((item) => {
        if (
          item.ct === "dashboard" &&
          item.gb === "IoWarningOutline " &&
          item.chechYn === "N"
        ) {
          return (
            <div key={item.docId} className={styles.content}>
              <h2>{formatData(item.createdAt)}</h2>
              <div className={styles.harvest}>
                <span>
                  <IoWarningOutline />
                </span>
                시스템이 오작동 중입니다!!
              </div>
            </div>
          );
        }
      })}
      {items.map((item) => {
        if (
          item.ct === "dashboard" &&
          item.gb === "IoWarning" &&
          item.chechYn === "N"
        ) {
          return (
            <div key={item.docId} className={styles.content}>
              <h2>{formatData(item.createdAt)}</h2>
              <div className={styles.harvest}>
                <span>
                  <IoWarning />
                </span>
                해당 지역에 자연재해가 발생했습니다!!
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default Alert;
