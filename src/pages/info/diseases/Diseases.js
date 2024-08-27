import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./Diseases.module.scss";

function Diseases(props) {
  const [pests, setPests] = useState(null);

  // useEffect(() => {
  //   const apiKey = "2024fae68820b6a8f539fd5def6a6dfd02c1";
  //   const fetchData = async () => {
  //     fetch(
  //       `http://api.rda.go.kr/npmsAPI/service$apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA003&cropName=논벼&sKncrCode1=FC&sKncrCode2=FC01`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log(result);
  //       });
  //   };
  //   fetchData();
  // }, []);
  return (
    <div>
      병해충 상담 서비스
      <div className={styles.main}>
        <div className={styles.search}>
          <input type="text" />
          <button>
            <CiSearch /> 조회
          </button>
        </div>
        <div className={styles.list}>
          {/* {pests ? (
            <pre>{JSON.stringify(pests, null, 2)}</pre>
          ) : (
            <p>로딩 중...</p>
          )} */}
          <ul>
            <li>리스트</li>
            <li>리스트</li>
            <li>리스트</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Diseases;
