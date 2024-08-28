import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../components/search_box/SearchBox";
import { Link } from "react-router-dom";
import DisasterList from "./disaster-list/DisasterList";

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
          // setData(result);
          console.log(result);
          console.log(result.base);
        });
    };
    fetchData();
  }, []);
  return (
    <div className={styles.main}>
      {/* 자연재해 리스트 */}
      {/* <div className={styles.search}>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>
          <CiSearch /> 조회
        </button>
      </div> */}
      <div className={styles.list}>
        <ul>
          <DisasterList />
          {/* <li>자연재해?</li>
          <li>리스트</li>
          <li>리스트</li>
          <li>list</li>
          <li>리스트</li>
          <li>리스트</li>
          <li>list</li>
          <li>리스트</li>
          <li>리스트</li> */}
        </ul>
      </div>
      <div className={styles.more}>
        <button>더보기</button>
      </div>
    </div>
  );
}

export default Disaster;
