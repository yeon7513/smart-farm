import React from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { TbBellFilled, TbHomeFilled, TbUserFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Clock from "../../../../../components/clock/Clock";
import styles from "./DashboardHeader.module.scss";
import Weather from "./weather/Weather";

function DashboardHeader({ info }) {
  const { latitude, longitude, crop, farmName, type } = info;
  const navigate = useNavigate();

  const typeTranslate = (type) => {
    switch (type) {
      case "facility":
        return "시설";
      case "openGround":
        return "노지";

      default:
        return "기타";
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.title}>
          <button className={styles.back} onClick={() => navigate(-1)}>
            <IoArrowBackCircle />
          </button>
          <h1>
            {farmName} / {typeTranslate(type)} / {crop}
          </h1>
        </div>
        <Clock />
        <div className={styles.icons}>
          <button className={styles.gotoHome} onClick={() => navigate("/")}>
            <TbHomeFilled />
          </button>
          <button className={styles.gotoAlert} onClick={() => navigate("/")}>
            <TbBellFilled />
          </button>
          <button
            className={styles.gotoMypage}
            onClick={() => navigate("/Mypage")}
          >
            <TbUserFilled />
          </button>
        </div>
      </div>
      <Weather latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default DashboardHeader;
