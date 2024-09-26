import React, { useEffect, useState } from "react";
import styles from "./Alert.module.scss";
import { addDatas } from "../../../../../../api/firebase";
import controlSlice, {
  getdashboardAlertContent,
} from "../../../../../../store/controlData/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import { dashboardAlert } from "../../../../../../utils/dashboardAlert";
import AlertContent from "./AlertComponent/AlertContent";
import { fetchDisasterDatas } from "../../../../../../store/disaster/disasterSlice";

function Alert() {
  const { count, randomCount, dashboardAlertContent } = useSelector(
    (state) => state.controlSlice
  );
  const { isLoading } = useSelector((state) => state.dashboardSlice);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [postCount, setPostCount] = useState(posts.length);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [isPestAlerted, setIsPestAlerted] = useState(false);
  const [isAlmostHarvest, setIsAlmostHarvest] = useState(false);
  const [isDiseaster, setIsDiseaster] = useState(false);
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

    dispatch(fetchDisasterDatas("disasters"));
  }, []);

  useEffect(() => {
    if (count === Math.round(fruitNum) && !hasExecuted) {
      alert("수확");
      handleAddAlert({ content: "complete", gb: "IoLeaf" });
      setHasExecuted(true); //함수 한 번만 실행하고 종료.
    } else if (count === Math.round(fruitNum * 0.9) && !isAlmostHarvest) {
      alert("수확예정");
      handleAddAlert({ content: "almost", gb: "IoLeafOutline" });
      setIsAlmostHarvest(true);
    }
    if (Math.round(randomCount) === 1000 && !isPestAlerted) {
      alert("병해충");
      handleAddAlert({ content: "disease", gb: "IoWarning" });
      setIsPestAlerted(true);
    }
  }, [count, fruitNum, hasExecuted, isAlmostHarvest]);
  // useEffect(() => {
  //   handleAddAlert({ content: "weather", gb: "IoWarning" });
  // }, [posts.length]);
  console.log(count);
  console.log(Math.round(randomCount));

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
