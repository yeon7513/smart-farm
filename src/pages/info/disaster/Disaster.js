import React, { useEffect, useState } from "react";
import styles from "./Disaster.module.scss";
import DisasterList from "./disaster-list/DisasterList";
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineNavigateNext } from "react-icons/md";
import DisasterButton from "./disaster-button/DisasterButton";

function Disaster(props) {
  return (
    <div className={styles.main}>
      {/* <DisasterButton /> */}
      {/* {weatherData && (
        <div>
          <h3>도시{weatherData.name}</h3>

          <p>Base: {weatherData.base}</p>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )} */}
      {/* <div className={styles.search}>
        <input type="text" placeholder="검색어를 입력해주세요" />
        <button>
          <CiSearch /> 조회
        </button>
      </div> */}
      <div className={styles.list}>
        <ul>
          <DisasterList />
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
