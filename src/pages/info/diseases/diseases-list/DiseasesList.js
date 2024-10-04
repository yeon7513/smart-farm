import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import InfoInput from "../input/InfoInput";
import styles from "./DiseasesList.module.scss";
import Pagination from "./pagination/Pagination";

const DISPLAY_COUNT = 12; //한 페이지에 표시할 데이터의 개수를 정의.
// const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
const apiKey = process.env.REACT_APP_DISEASESLIST_API_KEY;

function DiseasesList() {
  const [data, setData] = useState({ list: [], totalCount: 0 }); // API 데이터를 저장할 상태
  const [totalPages, setTotalPages] = useState(1); //전체 페이지 수를 저장할 상태.
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지 번호를 저장할 상태.
  const [selectedType, setSelectedType] = useState("NP01"); // 현재 선택된 유형 ("병해" 또는 "해충")
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 저장
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  // 페이지 번호가 변경되었을 때 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호를 업데이트합니다
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };
  // 병해 또는 해충 유형이 변경되었을 때 호출되는 함수
  const handleTypeChange = (type) => {
    setSelectedType(type); //선택된 유형 업데이트
    setCurrentPage(1); // 페이지를 1로 초기화
  };
  // 컴포넌트가 마운트되거나 selectedType 또는 currentPage가 변경될 때마다 데이터를 가져오는 effect이다.
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const searchQuery = searchTerm
          ? `&cropName=${encodeURIComponent(searchTerm)}`
          : "";

        const response = await fetch(
          `desease/?apiKey=${apiKey}&serviceCode=SVC16&serviceType=AA003&displayCount=12&startPoint=${
            (currentPage - 1) * DISPLAY_COUNT
          }&divCode=${selectedType}${searchQuery}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // 응답을 JSON으로 파싱한다.
        const result = await response.json();

        setData(result.service);
        setTotalPages(Math.ceil(result.service.totalCount / DISPLAY_COUNT));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
      setIsLoading(false);
    };

    fetchData(); //데이터를 가져오는 함수 호출
  }, [selectedType, currentPage, searchTerm]); // selectedType이나 currentPage가 변경될 때마다 이 effect가 재실행됩니다.
  return (
    <>
      {/* 로딩 중일 때 ScaleLoader 표시 */}
      {isLoading ? (
        <div className={styles.loader}>
          <ScaleLoader color="#36D7B7" />
        </div>
      ) : (
        <>
          {/* 검색 입력 */}
          <InfoInput onSearch={handleSearch} />

          {/* 병해와 해충 버튼 */}
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

          {/* 데이터 리스트 */}
          <div className={styles.items}>
            {data.list.length === 0 ? (
              <div className={styles.no_results}>
                <span>조회된 결과가 없습니다.</span>
              </div>
            ) : (
              data.list?.map((item, idx) => (
                <div key={idx} className={styles.item}>
                  <div className={styles.title}>
                    <div className={styles.item_img}>
                      <img src={item.thumbImg} alt={item.korName} />
                    </div>

                    <div className={styles.item_name}>
                      <div className={styles.item_list}>
                        <div>
                          <p>{item.cropName}</p>
                        </div>
                        <div>
                          <span>({item.divName})</span>
                        </div>

                        <div className={styles.item_list}>
                          <Link
                            to={`/info/diseases/${item.cropCode}`}
                            state={{
                              korName: item.korName,
                              cropName: item.cropName,
                              selectedType,
                              thumbImg: item.thumbImg,
                            }}
                          >
                            <span className={styles.name}>{item.korName}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 페이지네이션 */}
          {data.list.length > 0 && (
            <div className={styles.more}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
export default DiseasesList;
