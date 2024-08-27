import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./DiseasesList.module.scss";
import DiseasesItem from "../diseases-item/DiseasesItem";
import { CiSearch } from "react-icons/ci";

const diseasesList = [
  {
    id: 1,
    path: "dddd1",
    name: "감자수염진딧물",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 2,
    path: "dddd2",
    name: "병해충이름2",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 3,
    path: "dddd3",
    name: "병해충이름3",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 4,
    path: "dddd4",
    name: "병해충이름4",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 5,
    path: "dddd5",
    name: "병해충이름5",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 6,
    path: "dddd6",
    name: "병해충이름6",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 7,
    path: "dddd7",
    name: "병해충이름7",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 8,
    path: "dddd8",
    name: "병해충이름8",
    a: "증상",
    b: "대처법 또는 방제법",
  },
  {
    id: 9,
    path: "dddd9",
    name: "병해충이름9",
    a: "증상",
    b: "대처법 또는 방제법",
  },
];

function DiseasesList() {
  // const [more,setMore]=useState(5);
  // const handleLoadMore=()=>{
  //   setMore
  // }
  return (
    <>
      <div className={styles.search}>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>
          <CiSearch /> 조회
        </button>
      </div>
      {diseasesList.map((item) => (
        <li key={item.id} className={styles.item}>
          <div>
            <span>작물명-</span>
            <span>해충</span>
          </div>
          <Link to={`/info/diseases/${item.path}`}>
            <p>{item.name}</p>
          </Link>
        </li>
      ))}
      <div className={styles.more}>
        <button>더보기</button>
      </div>
    </>
  );
}

export default DiseasesList;
