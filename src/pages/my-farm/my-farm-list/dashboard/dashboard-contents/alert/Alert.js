import React, { useEffect, useState } from "react";
import {
  IoLeaf,
  IoLeafOutline,
  IoWarning,
  IoWarningOutline,
} from "react-icons/io5";
import styles from "./Alert.module.scss";
import { addDatas } from "../../../../../../api/firebase";
import { getItems } from "../../../../../../store/controlData/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";

function Alert() {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.controlSlice);
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [realState, setRealState] = useState(false);
  const [fruitNum, setFruitNum] = useState("");
  const [farmCode, setFarmCode] = useState("349");
  const [value, setValue] = useState(0); // 초기 값 설정

  const handleAddAlert = async () => {
    let content;
    if (realState == true) {
      content = "수확 시기가 됏습니다.";
    }
    if (realState == false) {
      content =
        " 예상 수확 시기가 다가오고 있습니다. 예상 수확량은 00kg입니다.";
    }
    const addObj = {
      chechYn: "N",
      content: content,
      createdAt: new Date().getTime(),
      ct: "dashboard",
      gb: "IoLeaf",
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

  useEffect(() => {
    const now = new Date();
    const currentHours = now.getMinutes();
    if (currentHours == 30) {
      setValue((prevValue) => prevValue + 1);
    }
  }, []);

  useEffect(() => {
    dispatch(getItems({ collectionName: "alert" }));
    dispatch(fetchGrowthData(`searchFrmhsCode=${farmCode}`));
    const firstThing = growthData?.filter((data) => data.frtstCo > 16);
    firstThing?.map((data) => setFruitNum(data.frtstCo));
  }, []);

  useEffect(() => {
    if (value === 3) {
      setRealState(true);
      handleAddAlert();
    } else if (value === 2) {
      setRealState(false);
      handleAddAlert();
    }
  }, []);
  console.log(value);
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
                예상 수확 시기가 다가오고 있습니다. 예상 수확량은 00kg입니다.
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
