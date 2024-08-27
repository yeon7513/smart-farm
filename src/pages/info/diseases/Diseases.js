import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import styles from "./Diseases.module.scss";

function Diseases(props) {
  const [pests, setPests] = useState(null);
  // useEffect(() => {
  //   const apiKey = "2024570e96d7a69a9e49dfeb7fdc9739177c";
  //   const fetchData = async () => {
  //     fetch()
  // `http://ncpms.rda.go.kr/npmsAPI/service?apiKey=${apiKey}&serviceCode=SVC01&serviceType=AA001&dtlSrchFlag=kncr1`
  // `http://ncpms.rda.go.kr/npmsAPI/service?apiKey=${apiKey}&serviceCode=SVC16&serviceType=AA003`
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
