import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import { CiSearch } from "react-icons/ci";

function Disaster(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiKey = "3bd960b544d8e85c3f24e4e2d139794c";
    const fetchData = async () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}`
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
        });
    };
    fetchData();
  }, []);
  return (
    <div className={styles.main}>
      자연재해 리스트
      <div className={styles.search}>
        <input type="text" />
        <button>
          <CiSearch /> 조회
        </button>
      </div>
      <div className={styles.list}>
        {/* {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>로딩 중...</p>} */}
        <ul>
          <li>리스트</li>
          <li>리스트</li>
          <li>리스트</li>
        </ul>
      </div>
    </div>
  );
}

export default Disaster;
