import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./Diseases.module.scss";
import DiseasesList from "./diseases-list/DiseasesList";
import { Link, Outlet } from "react-router-dom";
// import DiseasesList from "./diseases-list/DiseasesList";

// const diseasesList = [
//   {
//     id: 1,
//     path: "dddd1",
//     name: "감자수염진딧물",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 2,
//     path: "dddd2",
//     name: "병해충이름2",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 3,
//     path: "dddd3",
//     name: "병해충이름3",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 4,
//     path: "dddd4",
//     name: "병해충이름4",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 5,
//     path: "dddd5",
//     name: "병해충이름5",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 6,
//     path: "dddd6",
//     name: "병해충이름6",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 7,
//     path: "dddd7",
//     name: "병해충이름7",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 8,
//     path: "dddd8",
//     name: "병해충이름8",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
//   {
//     id: 9,
//     path: "dddd9",
//     name: "병해충이름9",
//     a: "증상",
//     b: "대처법 또는 방제법",
//   },
// ];

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

  // useEffect(() => {
  //   const apiKey = "2024fae68820b6a8f539fd5def6a6dfd02c1";
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api1/apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&cropName=논벼&sKncrCode1=FC&sKncrCode2=FC01`
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       // console.log(response);
  //       const result = await response.json();
  //       console.log(result);
  //       setPests(result);
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <>
      <div className={styles.main}>
        {/* {pests && <pre>{JSON.stringify(pests, null, 2)}</pre>} */}
        <div className={styles.list}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Diseases;
