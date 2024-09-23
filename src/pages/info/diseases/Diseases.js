import React, { useState } from "react";
import styles from "./Diseases.module.scss";
import DiseasesList from "./diseases-list/DiseasesList";
import { Input } from "@mui/material";
import { Outlet } from "react-router-dom";

function Diseases(props) {
  return (
    <>
      {/* <Input /> */}
      <div className={styles.main}>
        <div className={styles.list}>
          {/* <Outlet /> */}
          <DiseasesList />
        </div>
      </div>
    </>
  );
}

export default Diseases;
