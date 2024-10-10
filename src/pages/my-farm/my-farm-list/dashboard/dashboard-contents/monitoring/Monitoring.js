import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrowthData } from "../../../../../../store/bestfarm/bestfarmSlice";
import RenderingChart from "../../../../../../components/chart/RenderingChart";
import styles from "./Monitoring.module.scss";
import Card from "../../../../../../components/card/Card";

function Monitoring() {
  const dispatch = useDispatch();
  const { growthData } = useSelector((state) => state.bestfarmSlice);
  const [chartType, setChartType] = useState("line");
  // ----------------------------------------------------------------
  const [averageState1, setAverageState1] = useState();
  const [averageState2, setAverageState2] = useState();
  const [averageState3, setAverageState3] = useState();
  const [averageState4, setAverageState4] = useState();
  const [averageState5, setAverageState5] = useState();
  const [averageState6, setAverageState6] = useState();
  const [averageState7, setAverageState7] = useState();
  // ----------------------------------------------------------------
  //---------------------------------------------------------------1
  const calculateAverage = (month) => {
    const growData1 = growthData?.filter((item) => item.frmMonth === month);
    const frtsNum1 = growData1?.map((item) => item.frtstGrupp);
    return frtsNum1?.reduce((acc, cur) => acc + cur, 0) / frtsNum1?.length || 0;
  };

  useEffect(() => {
    setAverageState1(calculateAverage("9"));
  }, [dispatch]);

  useEffect(() => {
    setAverageState2(calculateAverage("10"));
  }, [dispatch]);

  useEffect(() => {
    setAverageState3(calculateAverage("11"));
  }, [dispatch]);

  useEffect(() => {
    setAverageState4(calculateAverage("12"));
  }, [dispatch]);

  useEffect(() => {
    setAverageState5(calculateAverage("1"));
  }, [dispatch]);

  useEffect(() => {
    setAverageState6(calculateAverage("2"));
  }, [dispatch]);

  useEffect(() => {
    setAverageState7(calculateAverage("3"));
  }, [dispatch]);

  function formatData(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
  }
  const chatData = [
    {
      name: formatData(new Date().getTime() - 86400000 * 180),
      내농장: 1,
      우수농가: averageState1,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 150),
      내농장: 2,
      우수농가: averageState2,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 120),
      내농장: 5,
      우수농가: averageState3,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 90),
      내농장: 4,
      우수농가: averageState4,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 60),
      내농장: 5,
      우수농가: averageState5,
    },
    {
      name: formatData(new Date().getTime() - 86400000 * 30),
      내농장: 16,
      우수농가: averageState6,
    },
    {
      name: formatData(new Date().getTime()),
      내농장: 20,
      우수농가: averageState7,
    },
  ];

  return (
    <div>
      <section>
        <h1>환경 상태</h1>
        <div className={styles.boxes}>
          <Card className={styles.box}>
            <div>온도</div>
            <div className={styles.Num}>20</div>
          </Card>
          <Card className={styles.box}>
            <div>습도</div>
            <div className={styles.Num}>20</div>
          </Card>
          <Card className={styles.box}>
            <div>일사량</div>
            <div className={styles.Num}>50</div>
          </Card>
          <Card className={styles.box}>
            <div>풍량</div>
            <div className={styles.Num}>5</div>
          </Card>
          <Card className={styles.box}>
            <div>배수</div>
            <div className={styles.Num}>3</div>
          </Card>
        </div>
      </section>
      <section>
        <h1>상태 그래프</h1>
        <RenderingChart
          chartType={chartType}
          data={chatData}
          checkKey={"우수농가"}
        />
      </section>
      <section>
        <h1>CCTV</h1>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </div>
  );
}

export default Monitoring;
