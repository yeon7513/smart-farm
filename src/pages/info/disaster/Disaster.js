import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import DisasterList from "./disaster-list/DisasterList";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import DisasterButton from "./disaster-button/DisasterButton";
import DisasterItem from "./disasteritem/DisasterItem";
import { Outlet } from "react-router-dom";
import Writing from "./writing/Writing";

function Disaster(props) {
  return (
    <div className={styles.main}>
      <div className={styles.list}>
        <DisasterItem />
        {/* <Outlet /> */}
        <ul>
          <DisasterList />
        </ul>
        <Writing />
      </div>
    </div>
  );
}

export default Disaster;
