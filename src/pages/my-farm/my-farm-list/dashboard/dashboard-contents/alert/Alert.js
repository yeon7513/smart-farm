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
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.disasterSlice);
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [postCount, setPostCount] = useState(posts.length);
  const [hasExecuted, setHasExecuted] = useState(false);
  const [realState, setcountState] = useState(false);
  const [countState, setRealState] = useState(false);
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

  if (count === Math.round(fruitNum) && !hasExecuted) {
    alert("수확");
    // handleAddAlert({ content: "complete", gb: "IoLeaf" });
    setHasExecuted(true); //함수 한 번만 실행하고 종료.
  } else if (count === Math.round(fruitNum * 0.9) && !realState) {
    alert("수확예정");
    // handleAddAlert({ content: "almost", gb: "IoLeafOutline" });
    setRealState(true);
  }
  if (Math.round(randomCount) === 1000 && !countState) {
    alert("병해충");
    // handleAddAlert({ content: "disease", gb: "IoWarning" });
    setcountState(true);
  }
  useEffect(() => {
    if (posts.length > postCount) {
      alert("자연재해");
      // handleAddAlert({ content: "weather", gb: "IoWarning" });
    }
    setPostCount(posts.length);
  }, [posts.length]);
  console.log(posts.length);
  console.log(postCount);
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
