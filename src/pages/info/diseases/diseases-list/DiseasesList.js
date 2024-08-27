import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./DiseasesList.module.scss";
import DiseasesItem from "../diseases-item/DiseasesItem";

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
  return (
    <>
      {diseasesList.map((item) => (
        <li>
          <div>
            <Link to={`/info/diseases/${item.path}`}>
              <span>작물명-</span>
              <span>해충</span>
              <p>{item.name}</p>
            </Link>
          </div>
        </li>
      ))}
    </>
  );
}

export default DiseasesList;
