import React, { useEffect } from "react";
import { IoArrowBackCircle } from "react-icons/io5";
import { TbBellFilled, TbHomeFilled, TbUserFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import styles from "./DashboardHeader.module.scss";

function DashboardHeader({ info }) {
  const { crop, farmName, type } = info;
  const navigate = useNavigate();

  useEffect(() => {
    console.log(type);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.info}>
        <div className={styles.title}>
          <button className={styles.back} onClick={() => navigate(-1)}>
            <IoArrowBackCircle />
          </button>
          <h1>
            {farmName} / {type} / {crop}
          </h1>
        </div>
        {/* <Clock /> */}
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
    </div>
  );
}

export default DashboardHeader;
