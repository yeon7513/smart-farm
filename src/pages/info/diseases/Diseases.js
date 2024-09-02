import React, { useState } from "react";
import styles from "./Diseases.module.scss";
import DiseasesList from "./diseases-list/DiseasesList";
import { Input } from "@mui/material";
import { Outlet } from "react-router-dom";

function Diseases(props) {
  const [pests, setPests] = useState(null);

  // useEffect(() => {
  //   const apiKey = "2024fae68820b6a8f539fd5def6a6dfd02c1";
  //   const fetchData = async () => {
  //     fetch(
  //       `http://api.rda.go.kr/npmsAPI/service$apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&cropName=논벼&sKncrCode1=FC&sKncrCode2=FC01`
  //       // ` http://ncpms.rda.go.kr/npmsAPI/service?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr1`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log(result);
  //       });
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {/* <Input /> */}
      <div className={styles.main}>
        {/* {pests && <pre>{JSON.stringify(pests, null, 2)}</pre>} */}
        <div className={styles.list}>
          <Outlet />
          <DiseasesList />
        </div>
      </div>
    </>
  );
}

export default Diseases;
