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
  getdashboardAlertContent,
} from "../../../../../../store/controlData/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import {
  dashboardAlert,
  dashboardAlertIcon,
} from "../../../../../../utils/dashboardAlert";
import AlertContent from "./AlertComponent/AlertContent";
import { orderBy } from "firebase/firestore";

function Alert() {
  // const [count, setCount] = useState(1);
  // const [randomCount, setRandomCount] = useState(1);
  const { count, randomCount } = useSelector((state) => state.controlSlice);
  const dispatch = useDispatch();
  const { dashboardAlertContent } = useSelector((state) => state.controlSlice);
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [realState, setRealState] = useState(false);
  const [fruitNum, setFruitNum] = useState("");
  const [farmCode, setFarmCode] = useState("349");

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

  useEffect(() => {
    dispatch(
      getdashboardAlertContent({
        collectionName: "alert",
        orderByField: "createdAt",
      })
    );
    dispatch(fetchGrowthData(`searchFrmhsCode=${farmCode}`));
    const firstThing = growthData?.filter((data) => data.frtstCo > 16);
    firstThing?.map((data) => setFruitNum(data.frtstCo));
  }, []);

  if (count === Math.round(fruitNum) && !hasExecuted) {
    handleAddAlert({ content: "complete", gb: "IoLeaf" });
    setHasExecuted(true); //함수 한 번만 실행하고 종료.
  } else if (count === Math.round(fruitNum * 0.9) && !realState) {
    handleAddAlert({ content: "almost", gb: "IoLeafOutline" });
    setRealState(true);
  }
  if (Math.round(randomCount + 500) > 2400) {
    handleAddAlert({ content: "disease", gb: "IoWarning" });
  }
  return (
    <div className={styles.alert}>
      {dashboardAlertContent.map((item) => {
        if (item.ct === "dashboard" && item.chechYn === "N") {
          return <AlertContent item={item} key={item.docId} />;
        }
      })}
    </div>
  );
}

export default Alert;
