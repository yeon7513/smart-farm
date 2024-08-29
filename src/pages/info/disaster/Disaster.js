import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import { CiSearch } from "react-icons/ci";
import SearchBox from "../../../components/search_box/SearchBox";
import { Link } from "react-router-dom";
import DisasterList from "./disaster-list/DisasterList";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";

function Disaster(props) {
  const [weatherData, setWeatherData] = useState(null);

  // useEffect(() => {
  //   const apiKey = "3bd960b544d8e85c3f24e4e2d139794c";
  //   const fetchData = async () => {
  //     fetch(
  //       `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}`
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         // setData(result);
  //         console.log(result);
  //         console.log(result.base);
  //       });
  //     // console.log(weatherData.name);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  // 서울 날씨
  //   const apiKey = "3bd960b544d8e85c3f24e4e2d139794c";

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${apiKey}&lang={Kr}`
  //         // `https://api.openweathermap.org/data/2.5/forecast?lat=Seoul&lon=Seoul&appid=${apiKey}`
  //       );

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const result = await response.json();
  //       setWeatherData(result);
  //       console.log(result);
  //       // console.log(result.name);
  //     } catch (error) {
  //       console.error("There was a problem with the fetch operation:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className={styles.main}>
      {/* {weatherData && (
        <div>
          <h3>도시{weatherData.name}</h3>

          <p>Base: {weatherData.base}</p>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )} */}
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
      {/* <div className={styles.more}>
        <button>더보기</button>
      </div> */}
      <div className={styles.more}>
        <button>FIRST</button>
        <button>
          <GrFormPrevious />
        </button>
        <button>1</button>
        <button>2</button>
        <button>
          <MdOutlineNavigateNext />
        </button>
        <button>END</button>
      </div>
    </div>
  );
}

export default Disaster;
