import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoInput from "../input/InfoInput";
import styles from "./DiseasesList.module.scss";
import Pagination from "./pagination/Pagination";

// const diseasesList = [
//   {
//     id: 1,
//     path: "dddd1",
//     name: "감자수염진딧물",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 2,
//     path: "dddd2",
//     name: "병해충이름2",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 3,
//     path: "dddd3",
//     name: "병해충이름3",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 4,
//     path: "dddd4",
//     name: "병해충이름4",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 5,
//     path: "dddd5",
//     name: "병해충이름5",
//     a: "증상",
//     b: "대처법 또는 방제법",

//     image: image,
//   },
//   {
//     id: 6,
//     path: "dddd6",
//     name: "병해충이름6",
//     a: "증상",
//     b: "대처법 또는 방제법",

//     image: image,
//   },
//   {
//     id: 7,
//     path: "dddd7",
//     name: "병해충이름7",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 8,
//     path: "dddd8",
//     name: "병해충이름8",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 9,
//     path: "dddd9",
//     name: "병해충이름9",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 10,
//     path: "dddd9",
//     name: "병해충이름9",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 11,
//     path: "dddd9",
//     name: "병해충이름9",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
//   {
//     id: 12,
//     path: "dddd9",
//     name: "병해충이름9",
//     a: "증상",
//     b: "대처법 또는 방제법",
//     image: image,
//   },
// ];
const DISPLAY_COUNT = 12;
const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";

function DiseasesList() {
  const [data, setData] = useState({ list: [], totalCount: 0 }); // API 데이터를 저장할 상태
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("NP01"); // 현재 선택된 유형 ("병해" 또는 "해충")
  // const totalPages = data.totalCount / 12;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1); // 페이지를 1로 초기화
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `desease/?apiKey=${apiKey}&serviceCode=SVC16&serviceType=AA003&displayCount=12&startPoint=${
            (currentPage - 1) * DISPLAY_COUNT
          }&divCode=${selectedType}`
          // `/desease/?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&dtlSrchFlag=kncr1&displayCount=9`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        // console.log(result);
        setData(result.service);
        // setData({ list: filteredList, totalCount: result.service.totalCount });
        setTotalPages(Math.ceil(result.service.totalCount / DISPLAY_COUNT));
        // setTotalPages(totalCount);
        console.log(result.service);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchData();
  }, [selectedType, currentPage]);

  return (
    <>
      {/* <Input /> */}
      <InfoInput />
      <div className={styles.pest_search}>
        <div className={styles.party}>
          <button
            onClick={() => handleTypeChange("NP01")}
            className={selectedType === "NP01" ? styles.active : ""}
          >
            병해
          </button>
        </div>
        <div className={styles.pest}>
          <button
            onClick={() => handleTypeChange("NP03")}
            className={selectedType === "NP03" ? styles.active : ""}
          >
            해충
          </button>
        </div>
      </div>
      {/* <SearchBox /> */}
      <div className={styles.items}>
        {/*  */}

        {data.list?.map((item, idx) => (
          <div key={idx} className={styles.item}>
            <div className={styles.title}>
              <div className={styles.item_img}>
                <img src={item.thumbImg} alt={item.korName} />
              </div>

              <div className={styles.item_name}>
                <div className={styles.item_list}>
                  <p>{item.cropName}</p>
                </div>
                <span>({item.divName})</span>

                {/* <p>해충</p> */}
                <div className={styles.item_list}>
                  <Link
                    to={`/info/${item.cropCode}`}
                    state={{ korName: item.korName, selectedType }}
                  >
                    <p className={styles.name}>{item.korName}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/*  */}
      </div>
      <div className={styles.more}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default DiseasesList;
