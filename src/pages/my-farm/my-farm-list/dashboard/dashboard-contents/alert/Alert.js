import React, { useEffect, useState } from "react";
import styles from "./Alert.module.scss";
import { addDatas } from "../../../../../../api/firebase";
import { getdashboardAlertContent } from "../../../../../../store/controlData/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import { dashboardAlert } from "../../../../../../utils/dashboardAlert";
import AlertContent from "./AlertComponent/AlertContent";
import { fetchDisasterDatas } from "../../../../../../store/disaster/disasterSlice";

function Alert() {
  const { dashboardAlertContent } = useSelector((state) => state.controlSlice);
  const dispatch = useDispatch();
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [isPestAlerted, setIsPestAlerted] = useState(false);
  const [isAlmostHarvest, setIsAlmostHarvest] = useState(false);
  const [fruitNum, setFruitNum] = useState("");
  const [farmCode, setFarmCode] = useState("");
  const { count, randomCount } = useSelector((state) => state.controlSlice);
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
    dispatch(fetchGrowthData(`&searchFrmhsCode=${farmCode}`));
    setFarmCode("349");
    if (growthData) {
      const firstThing = growthData.filter((data) => data.frtstCo > 16);
      firstThing?.map((data) => setFruitNum(data.frtstCo));
    }
    dispatch(fetchDisasterDatas("disasters"));
  }, [dispatch, farmCode]);
  useEffect(() => {
    if (count === Math.round(fruitNum) && !hasExecuted) {
      console.log("수확");
      handleAddAlert({ content: "complete", gb: "IoLeaf" });
      setHasExecuted(true); //함수 한 번만 실행하고 종료.
    } else if (count === Math.round(fruitNum * 0.8) && !isAlmostHarvest) {
      console.log("수확예정");
      handleAddAlert({ content: "almost", gb: "IoLeafOutline" });
      setIsAlmostHarvest(true);
    }
    if (Math.round(randomCount) === 1000 && !isPestAlerted) {
      console.log("병해충");
      handleAddAlert({ content: "disease", gb: "IoWarning" });
      setIsPestAlerted(true);
    }
  }, [count, fruitNum, hasExecuted, isAlmostHarvest]);

  return (
    <div className={styles.alert}>
      {dashboardAlertContent.map((item) => {
        if (item.ct === "dashboard" && item.chechYn === "N") {
          return <AlertContent item={item} key={item.id} />;
        }
      })}
    </div>
  );
}

export default Alert;
